import React, { Component } from 'react';
import { Row, Col, Button, Card, CardBody, Label } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import ViewProductsTable from './components/viewProductsTable';
import invoiceViewHeader from '../../../assets/images/invoiceViewHeader.png';

class ViewSale extends Component {
    constructor(props) {
        super(props);
        const record = JSON.parse(localStorage.getItem('record'));
        const metaData = JSON.parse(record.meta_data[0].value);
        this.state = metaData;
    }

    render() {
        const { poDetails, invoiceDetails, balance, tax } = this.state;
        const { invoiceProducts } = invoiceDetails;
        const { invoiceNumber, customer, poNumber, poStatus, orderGivenBy, billStatus, orderDate, deliveryDate, } = poDetails;
        const { charity, discount, grandTotal, previousBalance, receivedAmount, total, totalBalance } = balance;
        const { salesTax, isSalesTaxApplied } = tax;
        return (
            <div>
                <div ref={el => (this.componentRef = el)}>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col>
                                <img src={invoiceViewHeader} width='100%' height='80%' alt='logo'></img>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col>
                                    <Label>Invoice #</Label>
                                    <div>{invoiceNumber}</div>
                                </Col>
                                <Col>
                                    <Label>Customer</Label>
                                    <div>{customer.name}</div>
                                </Col>
                                <Col>
                                    <Label>PO #</Label>
                                    <div>{poNumber}</div>
                                </Col>
                                <Col>
                                    <Label>PO Status</Label>
                                    <div>{poStatus}</div>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col>
                                    <Label>Order Given By</Label>
                                    <div>{orderGivenBy}</div>
                                </Col>
                                <Col>
                                    <Label>Order Date</Label>
                                    <div>{orderDate}</div>
                                </Col>
                                <Col>
                                    <Label>Delivery Date</Label>
                                    <div>{deliveryDate}</div>
                                </Col>
                                <Col>
                                    <Label>Bill Status</Label>
                                    <div>{billStatus}</div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <ViewProductsTable products={invoiceProducts} />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col>
                                    <Label>Total Amount</Label>
                                    <div>{total}</div>
                                </Col>
                                <Col>
                                    <Label>Discount</Label>
                                    <div>{discount}</div>
                                </Col>
                                <Col>
                                    <Label>Charity</Label>
                                    <div>{charity}</div>
                                </Col>
                                <Col>
                                    <Label>Total Balance</Label>
                                    <div>{totalBalance}</div>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                            <Col>
                                    <Label>Previous Balance</Label>
                                    <div>{previousBalance}</div>
                                </Col>
                                <Col>
                                    <Label>Received Amount</Label>
                                    <div>{receivedAmount}</div>
                                </Col>
                                <Col>
                                    <Label>Grand Total</Label>
                                    <div>{grandTotal}</div>
                                </Col>
                                <Col>
                                    <Label>Sales Tax</Label>
                                    <div>{isSalesTaxApplied ? salesTax : 0}</div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
                <ReactToPrint
                    trigger={() => {
                        return (
                            <Row>
                                <Col sm="12" md={{ size: 6, offset: 3 }} className='text-center'>
                                    <Button color='success'><i className="fas fa-print"></i> Print</Button>
                                </Col>
                            </Row>
                        )
                    }}
                    content={() => this.componentRef}
                    documentTitle = {`Sales Invoice - ${invoiceNumber}`}
                />
            </div>
        )
    }
}

export default ViewSale;