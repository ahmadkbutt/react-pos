import React, { Component } from 'react';
import PoForm from './components/poForm';
import { formatDate } from 'src/helper/helper';
import { pick, omit } from 'underscore';
import API from 'src/utils/api';
import InvoiceForm from './components/invoiceForm';
import { round } from 'mathjs';
import BalanceDetails from './components/balanceDetails';
import _ from 'lodash';
import { toast } from 'react-toastify';

class AddSale extends Component {

    constructor(props) {
        super(props);
        this.api = new API('orders');
        this.state = {
            poDetails: {
                customers: [],
                invoiceNumber: '',
                customerName: {
                    name: 'Enter Customer Name',
                    id: 0
                },
                poNumber: '',
                poStatus: 'pending',
                orderGivenBy: '',
                orderDate: formatDate(),
                deliveryDate: formatDate(),
                billStatus: 'pending'
            },
            invoiceDetails: {
                products: [],
                invoiceProducts: [],
                isProductSelected: false,
            },
            selectedProduct: '',
            tax: {
                salesTax: 17,
                isSalesTaxApplied: false,
            },
            balance: {
                total: 0,
                discount: 1,
                charity: 1,
                totalBalance: 0
            }
        }
    }

    componentDidMount() {
        this.setInvoiceAndPoNumber();
        this.getCustomers();
        this.getProducts();
        this.addInvoiceTableRow();
    }

    addInvoiceTableRow = () => {
        const { invoiceDetails } = this.state;
        let { invoiceProducts } = invoiceDetails;
        invoiceProducts = [...invoiceProducts, {
            id: invoiceProducts.length + 1,
            category: '',
            name: '',
            quantity: 0,
            price: 0,
            salesTax: 0,
            amount: 0,
            amountIncSalesTax: 0,
            productId: ''
        }]
        invoiceDetails.invoiceProducts = invoiceProducts;
        this.setState({ invoiceDetails })
    }

    deleteInvoiceTableRow = (record) => {
        console.log(record)
        const { id } = record;
        const { invoiceDetails } = this.state;
        const { invoiceProducts } = invoiceDetails;
        const revisedInvoiceProducts = invoiceProducts.filter(product => product.id !== id);
        invoiceDetails.invoiceProducts = revisedInvoiceProducts;
        this.setState({ invoiceDetails }, this.handleInvoiceBalance);

    }

    /**
     * PO Details Methods section
     */


    getCustomers = async () => {
        const { poDetails } = this.state;
        const api = new API("customers");
        const customers = await api.get();
        poDetails.customers = customers

        this.setState({
            poDetails
        })
    }

    setInvoiceAndPoNumber = async () => {
        const { poDetails } = this.state;
        const api = new API("orders");
        const orders = await api.get();
        const ordersCount = orders.length;

        poDetails.invoiceNumber = `${formatDate()}.${ordersCount + 1}`;
        poDetails.poNumber = ordersCount + 1;

        this.setState({
            poDetails
        })
    }

    handlePoOpen = () => {
        const { isPoOpen } = this.state;
        this.setState({
            isPoOpen: !isPoOpen
        })
    }

    handlePoDetailsChange = (e) => {
        const { name, value } = e.target;
        const { poDetails } = this.state;
        poDetails[name] = value
        this.setState({
            poDetails
        })
    }

    /**
     * 
     * Invoice Products Section
     */

    getProducts = async () => {
        const { invoiceDetails } = this.state;
        const api = new API("products");
        const products = await api.get();
        invoiceDetails.products = products

        this.setState({
            invoiceDetails
        })

    }

    handleProductSelect = (value) => {
        const { productId, id } = value;
        const { invoiceDetails } = this.state;
        const selectedProduct = invoiceDetails.products.filter(product => product.id === productId)[0];
        this.setState({
            selectedProduct
        }, () => this.addInvoiceProduct(id))
    }

    handleQuantityChange = (e) => {
        const { id, value } = e.target;
        const { invoiceDetails } = this.state;
        const recordObj = JSON.parse(id);
        const { productId } = recordObj
        const selectedProduct = invoiceDetails.products.filter(product => product.id === productId)[0];
        selectedProduct.quantity = parseInt(value);
        this.setState({
            selectedProduct
        }, () => this.addInvoiceProduct(recordObj.id))
    }

    addInvoiceProduct = (recordId) => {
        const { selectedProduct, invoiceDetails } = this.state;
        let { invoiceProducts } = invoiceDetails;
        invoiceProducts.forEach(product => {
            if (product.id === recordId) {
                product.productId = selectedProduct.id;
                product.name = selectedProduct.name;
                product.category = selectedProduct.categories[0].name;
                product.price = parseInt(selectedProduct.price);
                product.quantity = selectedProduct.quantity ? selectedProduct.quantity : product.quantity;
                product.amount = product.quantity ? product.quantity * product.price : 0;
            }
        })
        this.setState({ invoiceDetails }, this.handleInvoiceBalance)
    }

    /**
     * tax section
     */

    handleSalesTaxToggle = () => {
        const { tax } = this.state;
        const { isSalesTaxApplied } = tax;
        tax.isSalesTaxApplied = !isSalesTaxApplied;
        this.setState({ tax }, this.handleInvoiceBalance)
    }

    handleTaxChange = (e) => {
        const { value } = e.target;
        const { tax } = this.state;
        tax.salesTax = parseInt(value);
        this.setState({ tax }, this.handleInvoiceBalance)
    }

    /**
     * Balance Detail Section
     */


    handleInvoiceBalance = () => {
        const { invoiceDetails, tax, balance } = this.state;
        let total = 0
        const { invoiceProducts } = invoiceDetails;
        const { isSalesTaxApplied, salesTax } = tax;
        console.log(isSalesTaxApplied);
        invoiceProducts.forEach(product => {
            product.salesTax = isSalesTaxApplied ? round((product.amount * salesTax) / 100, 2) : 0;
            product.amountIncSalesTax = isSalesTaxApplied ? round(product.amount + (product.amount * salesTax) / 100, 2) : product.amount;
            total = total + product.amountIncSalesTax
        })
        balance.total = total;
        balance.totalBalance = round(balance.total - (balance.total * balance.discount) / 100, 2);
        this.setState({ invoiceDetails, balance })
    }

    handleBalanceDetailChange = (e) => {
        const { name, value } = e.target;
        const { balance } = this.state;
        balance[name] = value;
        this.setState({ balance }, this.handleInvoiceBalance)
    }

    /**
     * post PO
     */

    handleSubmit = async () => {
        const stateClone = _.cloneDeep(this.state);
        stateClone.invoiceDetails = omit(stateClone.invoiceDetails, 'products');
        const data = {
            meta_data: [{ key: 'state', value: JSON.stringify(stateClone) }]
        };
        const order = await this.api.add(data);
        if (order) {
            toast.success('P.O Added Successfully');
            this.props.history.push('/sales');
        }
    }


    render() {
        const { invoiceDetails } = this.state;
        return (
            <>
                <PoForm defaultValues={pick(this.state, 'poDetails')} handleChange={this.handlePoDetailsChange} />
                <InvoiceForm productData={[...invoiceDetails.invoiceProducts]} products={[...invoiceDetails.products]}
                    handleProductSelect={this.handleProductSelect} handleQuantityChange={this.handleQuantityChange}
                    addRow={this.addInvoiceTableRow} deleteRow={this.deleteInvoiceTableRow}
                />
                <BalanceDetails tax={this.state.tax} balance={this.state.balance} handleTaxChange={this.handleTaxChange}
                    handleSalesTaxToggle={this.handleSalesTaxToggle} handleBalanceDetailChange={this.handleBalanceDetailChange}
                    handleSubmit={this.handleSubmit}
                />
            </>
        )
    }
}

export default AddSale;