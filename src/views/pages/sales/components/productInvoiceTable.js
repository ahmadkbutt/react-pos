import React, { Component, Fragment } from 'react';
import ReactDatatable from "@ashvin27/react-datatable";
import { toast } from "react-toastify";
import {
    Card,
    CardBody,
    Button,
    CardHeader,
    Row,
    Col,
    Input
} from "reactstrap";
import Select from 'react-select';

class ProductInvoiceTable extends Component {
    render() {
        const { products } = this.props;
        const columns = [
            {
                key: "id",
                text: "sr",
                className: "id",
                align: "left",
                sortable: true,
                width: 40,
            },
            {
                key: "type",
                text: "type",
                className: "type",
                align: "left",
                sortable: true,
                width: 80,
            },
            {
                key: "name",
                text: "name",
                className: "name",
                align: "left",
                sortable: true,
                width: 120,
                cell: (record) => {

                    return <Select
                        options={products.map(product => {
                            return {
                                value: product.name,
                                label: product.name,
                                target: {
                                    id: record.id,
                                    value: product.name
                                }
                            }
                        })}
                        onChange={(e) => this.props.handleProductChange(e)}
                        name="products"
                        id="products"
                    />
                }
            },
            {
                key: "quantity",
                text: "quantity",
                className: "quantity",
                align: "left",
                sortable: true,
                width: 50,
                cell: (record) => {
                    return <Input type='number' id={record.id}
                        disabled={record.isQuantityDisabled} defaultValue={record.quantity} onChange={(e) => this.props.handleQuantityChange(e)}>

                    </Input>
                }
            },
            {
                key: "rate",
                text: "@",
                className: "rate",
                align: "left",
                sortable: true,
                width: 60,
            },
            {
                key: "salesTax",
                text: "sales tax",
                className: "salesTax",
                align: "left",
                sortable: true,
                width: 60,
            },
            {
                key: "amount",
                text: "amount",
                className: "amount",
                align: "left",
                sortable: true,
                width: 60,
            },
            {
                key: "amountIncSalesTax",
                text: "Amount Inc Sales Tax",
                className: "amountIncSalesTax",
                align: "left",
                sortable: true,
                width: 120,
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 80,
                align: "left",
                sortable: false,
                cell: (record) => {
                    return (
                        <Fragment>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => this.props.deleteProduct(record)}
                            >
                                <i className="fa fa-trash"></i>
                                Delete
                            </Button>
                        </Fragment>
                    );
                },
            },
        ];

        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col className='form-inline'>Products</Col>
                        <Col className="text-right">
                            <Button color="success" onClick={this.props.addProduct}>
                                Add Product
                            </Button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <ReactDatatable
                        records={this.props.invoiceProducts}
                        columns={columns}
                        extraButtons={[]}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default ProductInvoiceTable