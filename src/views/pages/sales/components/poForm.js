import { useState } from 'react';
import {
    Card, CardHeader, CardTitle, Row, Col,
    Button,
    CardBody,
    Collapse,
    Form, FormGroup, Label, Input
} from 'reactstrap';
import styles from 'src/common/styles.json';
import Select from 'react-select';

const PoForm = (props) => {
    const { defaultValues, handleChange } = props;
    const { poDetails } = defaultValues;
    const customersList = poDetails.customers.map(customer => {
        return {
            name: `${customer.first_name} ${customer.last_name}`,
            label: `${customer.first_name} ${customer.last_name}`,
            target: {
                name: "customerName",
                value: {
                    name: `${customer.first_name} ${customer.last_name}`,
                    id: customer.id
                }
            }
        }
    })
    const [isFormOpen, setFormOpen] = useState(true)
    const handleFormToggle = () => {
        setFormOpen(!isFormOpen);
    }

    const customerDefaultName = {
        label: poDetails.customerName.name,
        value: poDetails.customerName.name,
        target: {
            name: "customerName",
            value: {
                name: poDetails.customerName.name,
                id: poDetails.customerName.id,
            }
        }
    }

    return (
        <Card>
            <CardHeader style={{ background: styles.poFormHeader }}>
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
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="invoiceNumber">Invoice #</Label>
                                    <Input
                                        type="text"
                                        name="invoiceNumber"
                                        id="invoiceNumber"
                                        placeholder="Enter Invoice Number"
                                        defaultValue={defaultValues ? poDetails.invoiceNumber : ''}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="customerName">Customer Name</Label>
                                    <Select name="category" options={customersList}
                                        value={customerDefaultName}
                                        onChange={(e) => handleChange(e)}
                                    ></Select>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="poNumber">P.O #</Label>
                                    <Input
                                        type="text"
                                        name="poNumber"
                                        id="poNumber"
                                        placeholder="Enter P.O Number"
                                        defaultValue={defaultValues ? poDetails.poNumber : ''}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="poStatus">P.O Status</Label>
                                    <Input
                                        type="select"
                                        name="poStatus"
                                        id="poStatus"
                                        defaultValue={defaultValues ? poDetails.poStatus : 'pending'}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <option value='completed' >Completed</option>
                                        <option value='pending'>Pending</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="orderGivenBy">Order Given By</Label>
                                    <Input
                                        type="text"
                                        name="orderGivenBy"
                                        id="orderGivenBy"
                                        placeholder="Enter Order Given By"
                                        defaultValue={defaultValues ? poDetails.orderGivenBy : ''}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="orderDate">Order Date</Label>
                                    <Input
                                        type="date"
                                        name="orderDate"
                                        id="orderDate"
                                        placeholder="Enter Order Date"
                                        defaultValue={defaultValues ? poDetails.orderDate : ''}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="deliveryDate">Delivery Date</Label>
                                    <Input
                                        type="date"
                                        name="deliveryDate"
                                        id="deliveryDate"
                                        placeholder="Enter Delivery Date"
                                        defaultValue={defaultValues ? poDetails.deliveryDate : ''}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="billStatus">BillStatus</Label>
                                    <Input
                                        type="select"
                                        name="billStatus"
                                        id="billStatus"
                                        defaultValue={defaultValues ? poDetails.billStatus : 'pending'}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <option value='added' >Added</option>
                                        <option value='pending'>Pending</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Collapse>
        </Card>
    )
}

export default PoForm;