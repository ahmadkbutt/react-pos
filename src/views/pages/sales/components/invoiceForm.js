import { useState } from 'react';
import {
    Card, CardHeader, CardTitle, Row, Col,
    Button,
    CardBody,
    Collapse,
} from 'reactstrap';
import styles from 'src/common/styles.json';
import InvoiceTable from './invoiceTable';

const InvoiceForm = (props) => {
    const [isFormOpen, setFormOpen] = useState(true);
    const handleFormToggle = () => {
        setFormOpen(!isFormOpen);
    }

    return (
        <Card>
            <CardHeader style={{ background: styles.invoiceFormHeader, color: 'white' }}>
                <Row>
                    <Col sm='11' >
                        <CardTitle className='text-center' tag='h5'>
                            Invoice Details
                        </CardTitle>
                    </Col>
                    <Col className='text-right'>
                        <Button size='sm' outline onClick={handleFormToggle}>
                            <i className={isFormOpen ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}></i>
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <Collapse isOpen={isFormOpen}>
                <CardBody>
                    <InvoiceTable {...props}/>
                </CardBody>
            </Collapse>
        </Card>
    )
}

export default InvoiceForm