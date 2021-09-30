import React, { Component } from 'react';
import API from 'src/utils/api';
import DataTable from 'src/utils/dataTable';

class SalesList extends Component {
    constructor(props) {
        super(props);
        this.api = new API("orders");
        this.state = {
            orders: [],
            isLoading: true,
            filteredOrders: [],
        }
    }

    componentDidMount = () => {
        this.getOrders();
    }

    getOrders = async () => {
        const orders = await this.api.get();
        this.setState({ orders, filteredOrders: orders, isLoading: false })
    }

    getMetaData = (record) => {
        const metaData = JSON.parse(record.meta_data[0].value);
        return metaData
    }

    handleCustomFilter = (e) => {
        const { value } = e.target;
        const { orders } = this.state;
        const filteredOrders = orders.filter(order => {
            const { poDetails } = this.getMetaData(order);
            return poDetails.customer.name.toLowerCase().includes(value.toLowerCase());
        })
        value ? this.setState({ filteredOrders }) : this.setState({ filteredOrders: orders })
    }

    render() {
        const { isLoading, filteredOrders } = this.state;
        const columns = [
            {
                text: '#',
                cell: (record) => {
                    const { poDetails } = this.getMetaData(record);
                    return <span>{poDetails.invoiceNumber}</span>
                }
            },
            {
                text: 'Customer Name',
                cell: (record) => {
                    const { poDetails } = this.getMetaData(record);
                    return <span>{poDetails.customer.name}</span>
                }
            },
            {
                text: 'Order Date',
                cell: (record) => {
                    const { poDetails } = this.getMetaData(record);
                    return <span>{poDetails.orderDate}</span>
                }
            },
            {
                text: 'Delivery Date',
                cell: (record) => {
                    const { poDetails } = this.getMetaData(record);
                    return <span>{poDetails.deliveryDate}</span>
                }
            },
            {
                text: 'Status',
                cell: (record) => {
                    const { poDetails } = this.getMetaData(record);
                    return <span>{poDetails.poStatus}</span>
                }
            }
        ]
        return (
            <DataTable columns={columns} isLoading={isLoading} records={filteredOrders}
                endpoint={"orders"} callback={this.getOrders} showFilter={false} handleCustomFilter={this.handleCustomFilter} />
        );
    }
}

export default SalesList