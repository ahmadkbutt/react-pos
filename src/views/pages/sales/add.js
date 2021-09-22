import React, { Component } from 'react';
import PoForm from './components/poForm';
import { formatDate } from 'src/helper/helper';
import { pick } from 'underscore';
import API from 'src/utils/api';

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
            }
        }
    }

    componentDidMount() {
        this.setInvoiceAndPoNumber();
        this.getCustomers();
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
        const {name, value} = e.target;
        const {poDetails} = this.state;
        poDetails[name] = value
        this.setState({
            poDetails
        }, () => {
            console.log(this.state);
        })
    }


    render() {
        return (
            <>
                <PoForm defaultValues={pick(this.state, 'poDetails')} handleChange={this.handlePoDetailsChange}/>
            </>
        )
    }
}

export default AddSale;