import React, { Component, Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import { Card, CardBody, Button, CardHeader, Row, Col } from 'reactstrap';
import { toast } from "react-toastify";

class SalesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.getOrders();
    }

    getOrders = () => {
        const { api } = window;
        api.get("orders")
            .then((response) => {
                if(response?.data){
                    this.setState({
                        orders: response.data,
                        isLoading: false
                    })
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    getMetaValue = (arr, key) => {
        const metaValue = arr.filter(obj => {
            return obj.key === key
        })
        return metaValue[0]
    }

    redirectToAdd = () => {
        const { history } = this.props;
        history.push({
            pathname: "/sales/add",
        });
    };

    editRecord = (record) => {
        const {id} = record;
        localStorage.setItem('sales', JSON.stringify(record));
        this.props.history.push({
            pathname: `sales/${id}/edit`,
        })
    }

    deleteRecord = (record) => {
        const { id } = record;
        const { api } = window;
        api
            .delete(`orders/${id}`, {
                force: true,
            })
            .then((response) => {
                if (response?.data) {
                    toast.success("Record deleted successfully");
                    this.getOrders();
                }
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    render() {

        const columns = [
            {
                key: "invoice-number",
                text: "#",
                className: "invoice-number",
                align: "left",
                sortable: true,
                cell: record => {
                    const {meta_data} = record;
                    const invoiceObj = JSON.parse(this.getMetaValue(meta_data, 'invoice').value);
                    const {invoiceNumber} = invoiceObj
                    return <Fragment>
                        {invoiceNumber}
                    </Fragment>
                }
            },
            {
                key: "customer_name",
                text: "Customer Name",
                className: "customer_name",
                align: "left",
                sortable: true,
                cell: record => {
                    const {meta_data} = record;
                    const invoiceObj = JSON.parse(this.getMetaValue(meta_data, 'invoice').value);
                    const {customerName} = invoiceObj
                    return <Fragment>
                        {customerName}
                    </Fragment>
                }
            },
            {
                key: "order_date",
                text: "Order Date",
                className: "order_date",
                align: "left",
                sortable: true,
                cell: record => {
                    const {meta_data} = record;
                    const invoiceObj = JSON.parse(this.getMetaValue(meta_data, 'invoice').value);
                    const {orderDate} = invoiceObj
                    return <Fragment>
                        {orderDate}
                    </Fragment>
                }
            },
            {
                key: "delivery_date",
                text: "Delivery Date",
                className: "delivery_date",
                align: "left",
                sortable: true,
                cell: record => {
                    const {meta_data} = record;
                    const invoiceObj = JSON.parse(this.getMetaValue(meta_data, 'invoice').value);
                    const {deliveryDate} = invoiceObj
                    return <Fragment>
                        {deliveryDate}
                    </Fragment>
                }
            },
            {
                key: "status",
                text: "Status",
                className: "status",
                align: "left",
                sortable: true,
                cell: record => {
                    const {meta_data} = record;
                    const invoiceObj = JSON.parse(this.getMetaValue(meta_data, 'invoice').value);
                    const {poStatus} = invoiceObj
                    return <Fragment>
                        {poStatus}
                    </Fragment>
                }
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 200,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <Button
                                color="info"
                                size="sm"
                                onClick={() => this.editRecord(record)}
                                style={{ marginRight: '5px' }}>
                                <i className="fa fa-edit"></i>
                                Edit
                            </Button>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                                Delete
                            </Button>
                        </Fragment>
                    );
                }
            }
        ];
        const config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            button: {
                excel: true,
                print: true,
                csv: true,
                filename: "customers",
            }
        }

        return (
            <Card>
                <CardHeader>
                    <Row >
                        <Col className='form-inline'>Sales</Col>
                        <Col className="text-right">
                            <Button color="success" onClick={this.redirectToAdd}>Add Sales P.O</Button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <ReactDatatable
                        config={config}
                        records={this.state.orders}
                        columns={columns}
                        extraButtons={[]}
                        loading={this.state.isLoading}
                    />
                </CardBody>
            </Card>
        )
    }
}

export default SalesList