import React, { Component } from 'react';
import PoForm from './components/poForm';
import { formatDate } from 'src/helper/helper';
import { pick } from 'underscore';
import API from 'src/utils/api';
import InvoiceForm from './components/invoiceForm';
import {round} from 'mathjs';

class AddSale extends Component {

    constructor(props) {
        super(props);
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
                invoiceProducts: [
                    {
                        id: 1,
                        category: '',
                        name: '',
                        quantity: 0,
                        price: '',
                        salesTax: 0,
                        amount: 0,
                        amountIncSalesTax: 0
                    }
                ]
            }
        }
    }

    componentDidMount() {
        this.setInvoiceAndPoNumber();
        this.getCustomers();
        this.getProducts();
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

    handleProductChange = (e) => {
        const {name, value, id, productId} = e.target;
        console.log(name, value, id, productId);
        this.setInvoiceDetails(productId, id);
    }

    setInvoiceDetails = (productId, id) => {
        const {invoiceDetails} = this.state;
        const {products, invoiceProducts} = invoiceDetails;
        const productDetails = products.filter(product =>  product.id === productId)[0];
        invoiceProducts.forEach(invoiceProduct => {
            if(invoiceProduct.id === id){
                invoiceProduct.name = productDetails.name;
                invoiceProduct.price = round(productDetails.price, 2);
                invoiceProduct.category = productDetails.categories[0].name;
            }
        })

        this.setState({
            invoiceDetails
        }, () => {
            console.log(this.state.invoiceDetails);
        })
        
    }


    render() {
        return (
            <>
                <PoForm defaultValues={pick(this.state, 'poDetails')} handleChange={this.handlePoDetailsChange} />
                <InvoiceForm defaultValues={pick(this.state, 'invoiceDetails')} handleProductChange={this.handleProductChange}/>
            </>
        )
    }
}

export default AddSale;