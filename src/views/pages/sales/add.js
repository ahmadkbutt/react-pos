import React, { Component } from 'react';
import PoForm from './components/poForm';
import { formatDate } from 'src/helper/helper';
import { pick } from 'underscore';
import API from 'src/utils/api';
import InvoiceForm from './components/invoiceForm';
import BalanceDetails from './components/balanceDetails';
import _ from 'lodash';
import { toast } from 'react-toastify';
import ProductAddModal from './components/productAddModal';
import axios from 'axios';
import CustomerAddModal from './components/customerAddModal';

class AddSale extends Component {

    constructor(props) {
        super(props);
        this.api = new API('orders');
        this.state = {
            isModalOpen: false,
            isCustomerModalOpen: false,
            poDetails: {
                customers: [],
                invoiceNumber: '',
                customer: {
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
                total: 0.00,
                discount: 0,
                charity: 1,
                previousBalance: 0.00,
                receivedAmount: 0.00,
                totalBalance: 0.00,
                grandTotal: 0.00,
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
            price: 0.00,
            salesTax: 0.00,
            amount: 0.00,
            amountIncSalesTax: 0.00,
            productId: ''
        }]
        invoiceDetails.invoiceProducts = invoiceProducts;
        this.setState({ invoiceDetails })
    }

    deleteInvoiceTableRow = (record) => {
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
        const { REACT_APP_WORDPRESS_URL} = process.env;
        const response = await axios.get(`${REACT_APP_WORDPRESS_URL}/wp-json/str/v1/get_order_number`);
        const ordersCount = response?.data?.orderNo;

        poDetails.invoiceNumber = `${formatDate()}.${ordersCount}`;
        poDetails.poNumber = ordersCount;

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

    getPreviousBalance = async (customerId) => {
        const response = await axios.get(`https://starumer.com/wp-json/str/v1/get_customer_total/${customerId}`);
        return response?.data?.totalBalance
    }

    handlePoDetailsChange = async (e) => {
        const { name, value } = e.target;
        const { poDetails, balance } = this.state;
        poDetails[name] = value
        if (name === 'customer') {
            const previousBalance = await this.getPreviousBalance(value.id);
            balance.previousBalance = previousBalance
            this.setState({
                balance
            }, this.handleInvoiceBalance)
        }
        this.setState({
            poDetails,
            balance
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

    handlePropertyChange = (e) => {
        const { id, value, name } = e.target;
        const { invoiceDetails } = this.state;
        const recordObj = JSON.parse(id);
        const { productId } = recordObj
        const selectedProduct = invoiceDetails.products.filter(product => product.id === productId)[0];
        if (selectedProduct) {
            selectedProduct[name] = name === 'price' ? parseFloat(value).toFixed(2) : parseInt(value);
            this.setState({
                selectedProduct
            }, () => this.addInvoiceProduct(recordObj.id))
        }
    }

    addInvoiceProduct = (recordId) => {
        const { selectedProduct, invoiceDetails } = this.state;
        let { invoiceProducts } = invoiceDetails;
        invoiceProducts.forEach(product => {
            if (product.id === recordId) {
                product.productId = selectedProduct.id;
                product.name = selectedProduct.name;
                product.category = selectedProduct.categories[0].name;
                product.price = selectedProduct.price ? parseFloat(selectedProduct.price).toFixed(2) : 0.00;
                product.quantity = selectedProduct.quantity ? selectedProduct.quantity : product.quantity;
                product.amount = product.quantity ? parseFloat(product.quantity * product.price).toFixed(2) : 0.00;
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
        let total = 0.00
        const { invoiceProducts } = invoiceDetails;
        const { isSalesTaxApplied, salesTax } = tax;
        invoiceProducts.forEach(product => {
            product.salesTax = isSalesTaxApplied ? parseFloat((product.amount * salesTax) / 100).toFixed(2) : 0.00;
            product.amountIncSalesTax = isSalesTaxApplied ? parseFloat(parseFloat(product.amount) + parseFloat(product.salesTax)).toFixed(2) : parseFloat(product.amount).toFixed(2);
            total = parseFloat(parseFloat(total) + parseFloat(product.amountIncSalesTax)).toFixed(2);
        })
        balance.total = total;
        balance.totalBalance = parseFloat(parseFloat(balance.total) - (parseFloat(balance.total * balance.discount) / 100)).toFixed(2);
        balance.grandTotal = parseFloat(parseFloat(balance.totalBalance) + parseFloat(balance.previousBalance) - parseFloat(balance.receivedAmount ? balance.receivedAmount : 0.00)).toFixed(2);
        this.setState({ invoiceDetails, balance })
    }

    handleBalanceDetailChange = (e) => {
        const { name, value } = e.target;
        const { balance } = this.state;
        balance[name] = value;
        this.setState({ balance }, this.handleInvoiceBalance)
    }

    /**
     * product add modal section
     */

    toggleModal = () => {
        const { isModalOpen } = this.state;
        this.setState({ isModalOpen: !isModalOpen });
    }

    toggleCustomerModal = () => {
        const { isCustomerModalOpen } = this.state;
        this.setState({ isCustomerModalOpen: !isCustomerModalOpen });
    }

    /**
     * post PO
     */

    postProductPrice = () => {
        const { invoiceDetails } = this.state;
        const { invoiceProducts } = invoiceDetails;
        const api = new API("products");
        let areProductsPosted = true;
        invoiceProducts.forEach(async product => {
            const { price, productId } = product;
            const data = {
                regular_price: price.toString(),
            };
            const isProductPosted = await api.edit(productId, data);
            if (!isProductPosted) {
                areProductsPosted = false;
            }
        })
        return areProductsPosted;
    }

    handleSubmit = async () => {
        const { poDetails } = this.state;
        const { customer } = poDetails;
        const { id } = customer;
        const areProductsPosted = this.postProductPrice();
        if (areProductsPosted) {
            const stateClone = _.cloneDeep(this.state);
            delete stateClone.poDetails.customers;
            delete stateClone.invoiceDetails.products;
            const data = {
                customer_id: id,
                meta_data: [{ key: 'state', value: JSON.stringify(stateClone) }]
            };
            const order = await this.api.add(data);
            if (order) {
                toast.success('P.O Added Successfully');
                this.props.history.push('/sales');
            }
        }
    }



    render() {
        const { invoiceDetails, isModalOpen, isCustomerModalOpen } = this.state;
        return (
            <>
                <CustomerAddModal isModalOpen={isCustomerModalOpen} toggleModal={this.toggleCustomerModal} callback={this.getCustomers} />
                <ProductAddModal isModalOpen={isModalOpen} toggleModal={this.toggleModal} callback={this.getProducts} />
                <PoForm defaultValues={pick(this.state, 'poDetails')} handleChange={this.handlePoDetailsChange} toggleCustomerModal={this.toggleCustomerModal}/>
                <InvoiceForm productData={invoiceDetails.invoiceProducts} products={invoiceDetails.products}
                    handleProductSelect={this.handleProductSelect} handlePropertyChange={this.handlePropertyChange}
                    addRow={this.addInvoiceTableRow} deleteRow={this.deleteInvoiceTableRow}
                    toggleModal={this.toggleModal} 
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