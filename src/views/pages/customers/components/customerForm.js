import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import styles from 'src/common/styles.json';

const CustomerForm = (props) => {
    const { type, handleSubmit, validate, handleChange, defaultValue } = props;

    return (
        <Card>
            <CardHeader className='text-center' style={{ background: styles.formHeader, color: 'white' }}>
                <CardTitle tag='h5' >
                    {type} Customer
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Form >
                    <Row>
                        <Col sm='6' className='text-center'>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input type="text" name="firstName" placeholder="Enter First Name" onChange={(e) => handleChange(e)}
                                    defaultValue={defaultValue ? defaultValue.firstName : ''}
                                    invalid={validate.firstName === 'has-danger'} valid={validate.firstName === 'has-success'}></Input>
                                <FormFeedback valid>
                                </FormFeedback>
                                <FormFeedback>
                                    uh oh! seems like the field is empty
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col sm='6' className='text-center'>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input type="text" name="lastName" placeholder="Enter Last Name" onChange={(e) => handleChange(e)}
                                    defaultValue={defaultValue ? defaultValue.lastName : ''}
                                    invalid={validate.lastName === 'has-danger'} valid={validate.lastName === 'has-success'}></Input>
                                <FormFeedback valid>
                                </FormFeedback>
                                <FormFeedback>
                                    uh oh! seems like the field is empty
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm='6' className='text-center'>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="text" name="firstName" placeholder="Enter Email" onChange={(e) => handleChange(e)}
                                    defaultValue={defaultValue ? defaultValue.email : ''}
                                    invalid={validate.email === 'has-danger'} valid={validate.email === 'has-success'}></Input>
                                <FormFeedback valid>
                                </FormFeedback>
                                <FormFeedback>
                                    uh oh! seems like the field is empty
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col sm='6' className='text-center'>
                            <FormGroup>
                                <Label for="lastName">Phone Number</Label>
                                <Input type="text" name="phoneNumber" placeholder="Enter Phone Number" onChange={(e) => handleChange(e)}
                                    defaultValue={defaultValue ? defaultValue.phoneNumber : ''}
                                    invalid={validate.phoneNumber === 'has-danger'} valid={validate.phoneNumber === 'has-success'}></Input>
                                <FormFeedback valid>
                                </FormFeedback>
                                <FormFeedback>
                                    uh oh! seems like the field is empty
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm='6' md={{ size: 6, offset: 3 }} className='text-center'>
                            <Button color='info' onClick={handleSubmit}>
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card >
    )
}

export default CustomerForm