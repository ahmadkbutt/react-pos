import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

const CategoryForm = (props) => {
    const { type, handleSubmit, validate, handleChange, defaultValue } = props;
    
    return (
        <Card>
            <CardHeader className='text-center' style={{ backgroundImage: 'linear-gradient( 63.1deg,  rgba(5,23,111,1) 16.4%, rgba(24,95,240,1) 64.5% )', color: 'white' }}>
                <CardTitle tag='h5' >
                    {type} Category
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Form >
                    <Row>
                        <Col sm='6' md={{ size: 6, offset: 3 }} className='text-center'>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" placeholder="Enter Name" onChange={(e) => handleChange(e)}
                                defaultValue={defaultValue ? defaultValue.name : ''}
                                invalid={validate.name === 'has-danger'} valid={validate.name === 'has-success'}></Input>
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

export default CategoryForm