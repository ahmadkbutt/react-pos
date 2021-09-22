import { useState } from 'react';
import {
    Card, CardHeader, CardTitle, Row, Col,
    Button,
    CardBody,
    Collapse
} from 'reactstrap';

const PoForm = () => {
    const [isFormOpen, setFormOpen] = useState(true)
    const headerBackgroundColor = 'linear-gradient(125deg, #ECFCFF 0%, #ECFCFF 40%, #B2FCFF calc(40% + 1px), #B2FCFF 60%, #5EDFFF calc(60% + 1px), #5EDFFF 72%, #3E64FF calc(72% + 1px), #3E64FF 100%)';
    const handleFormToggle = () => {
        setFormOpen(!isFormOpen);
    }
    return (
            <Card>
                <CardHeader style={{ background: headerBackgroundColor }}>
                    <Row>
                        <Col sm='11' >
                            <CardTitle className='text-center' tag='h5'>
                                P.O Details
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

                </CardBody>
                </Collapse>
            </Card>
    )
}

export default PoForm;