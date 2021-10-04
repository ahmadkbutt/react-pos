import Select from 'react-select';
import { Card, CardHeader, CardTitle, CardBody, Form, Row, Col, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import styles from 'src/common/styles.json';

const ProductForm = (props) => {
    const { type, handleSubmit, validate, handleChange, defaultValue, categories } = props;
    const categoryDefaultValue = defaultValue?.category ? {
        label: defaultValue.category.name,
        value: defaultValue.category.name,
        target: {
            name: "category",
            value: {
                name: defaultValue.category.name,
                id: defaultValue.category.id
            }
        }
    } : {
        label: '',
        value: '',
        target: {
            name: "category",
            value: {
                name: '',
                id: ''
            }
        }
    }
    const categoriesList = categories.map(category => {
        const { name, id } = category
        return {
            label: name,
            value: name,
            target: {
                name: "category",
                value: {
                    name,
                    id
                }
            }
        }
    })

    return (
        <Card>
            <CardHeader className='text-center' style={{ background: styles.formHeader, color: 'white' }}>
                <CardTitle tag='h5' >
                    {type} Product
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Form >
                    <Row>
                        <Col sm='4' className='text-center'>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" placeholder="Enter Product Name" onChange={(e) => handleChange(e)}
                                    defaultValue={defaultValue ? defaultValue.name : ''}
                                    invalid={validate.name === 'has-danger'} valid={validate.name === 'has-success'}></Input>
                                <FormFeedback valid>
                                </FormFeedback>
                                <FormFeedback>
                                    uh oh! seems like the field is empty
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col sm='4' className='text-center'>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input type="number" name="price" placeholder="Enter Price" step="0.01" precsion="2" onChange={(e) => handleChange(e)}
                                    value={defaultValue ? defaultValue.price : ''}
                                    invalid={validate.price === 'has-danger'} valid={validate.price === 'has-success'}></Input>
                                <FormFeedback valid>
                                </FormFeedback>
                                <FormFeedback>
                                    uh oh! seems like the field is empty
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col sm='4' className='text-center'>
                            <FormGroup>
                                <Label for="category">Category</Label>
                                <Select name="category" options={categoriesList} onChange={(e) => handleChange(e)}
                                    value={categoryDefaultValue}
                                ></Select>
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

export default ProductForm