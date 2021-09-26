import React, { Component, Fragment } from 'react';
import API from 'src/utils/api';
import DataTable from 'src/utils/dataTable';

class SalesList extends Component {
    constructor(props) {
        super(props);
        this.api = new API("orders");
        this.state = {
            orders: [],
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.getOrders();
    }

    getOrders = async () => {
        const orders = await this.api.get();
        this.setState({ orders, isLoading: false })
    }

    getMetaData = (record) => {
        const metaData = JSON.parse(record.meta_data[0].value);
        return metaData
    }

    render() {
        const { isLoading, orders } = this.state;
        const columns = [
            {
                text: '#',
                cell: (record) => {
                    const {poDetails} = this.getMetaData(record);
                    console.log(poDetails);
                    return <span>{poDetails.invoiceNumber}</span>
                }
            },
            {
                text: 'Customer Name',
                cell: (record) => {
                    const {poDetails} = this.getMetaData(record);
                    return <span>{poDetails.customerName.name}</span>
                }
            },
            {
                text: 'Order Date',
                cell: (record) => {
                    const {poDetails} = this.getMetaData(record);
                    return <span>{poDetails.orderDate}</span>
                }
            },
            {
                text: 'Delivery Date',
                cell: (record) => {
                    const {poDetails} = this.getMetaData(record);
                    return <span>{poDetails.deliveryDate}</span>
                }
            },
            {
                text: 'Status',
                cell: (record) => {
                    const {poDetails} = this.getMetaData(record);
                    return <span>{poDetails.poStatus}</span>
                }
            }
        ]
        return (
            <DataTable columns={columns} isLoading={isLoading} records={orders}
                endpoint={"products/categories"} callback={this.getOrders} />
        );
    }
}

export default SalesList