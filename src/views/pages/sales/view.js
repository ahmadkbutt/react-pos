import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import ViewProductsTable from './components/viewProductsTable';
import invoiceViewHeader from '../../../assets/images/invoiceViewHeader.png';
import InvoiceHeaderTable from './components/invoiceHeaderTable';
import './view.css';

class ViewSale extends Component {
    constructor(props) {
        super(props);
        const record = JSON.parse(localStorage.getItem('record'));
        const metaData = JSON.parse(record.meta_data[0].value);
        this.state = metaData;
    }

    render() {
        const { poDetails, invoiceDetails, balance } = this.state;
        const { invoiceProducts } = invoiceDetails;
        const { invoiceNumber, customer, deliveryDate } = poDetails;
        const {  total} = balance;
        return (
            <div className='mainContainer'>
                <div ref={el => (this.componentRef = el)}>
                    <div><img src={invoiceViewHeader} width='100%' height='140vh' alt='logo'></img></div>
                    <InvoiceHeaderTable poNumber={invoiceNumber} deliveryDate={deliveryDate} customer={customer.name} total={total}/>
                    <ViewProductsTable products={invoiceProducts}/>
                </div>
                <br/>
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