import React, { Component, Fragment } from 'react';
import ReactDatatable from "@ashvin27/react-datatable";
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
                text: "Sr",
                className: "id",
                align: "center",
                sortable: true,
                width: 40,
            },
            {
                key: "type",
                text: "Type",
                className: "type",
                align: "center",
                sortable: true,
                width: 80,
            },
            {
                key: "name",
                text: "Name",
                className: "name",
                align: "center",
                sortable: true,
                width: 200,
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
                        value= {
                            {
                                value: record.name,
                                label: record.name,
                                target: {
                                    id: record.productId,
                                    value: record.name
                                }
                            }
                        }
                    />
                }
            },
            {
                key: "quantity",
                text: "Quantity",
                className: "quantity",
                align: "center",
                sortable: true,
                width: 100,
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
                align: "center",
                sortable: true,
                width: 30,
            },
            {
                key: "salesTax",
                text: "S.T",
                className: "salesTax",
                align: "center",
                sortable: true,
                width: 60,
            },
            {
                key: "amount",
                text: "Amount",
                className: "amount",
                align: "center",
                sortable: true,
                width: 60,
            },
            {
                key: "amountIncSalesTax",
                text: "Amt Inc S.T",
                className: "amountIncSalesTax",
                align: "center",
                sortable: true,
                width: 80,
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 30,
                align: "center",
                sortable: false,
                cell: (record) => {
                    return (
                        <Fragment >
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => this.props.deleteProduct(record)}
                            >
                                <i className="fa fa-trash"></i>
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