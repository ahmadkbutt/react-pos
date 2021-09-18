import {
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Button,
    Row,
    Col,
    option
} from "reactstrap";

export const AddProductForm = (props) => {
    const {handleInputChange, validate, price, productCategories, handleSubmit} = props;
    return (
        <Form>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name">Name</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Enter Product Name"
                                                onChange={handleInputChange}
                                                invalid={validate.name === "has-danger"}
                                            />
                                            <FormFeedback>
                                                Uh oh! Looks like you left the field empty. Please
                                                input.
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name">Price</Label>
                                            <Input
                                                type="number"
                                                name="price"
                                                id="price"
                                                placeholder="Enter Product Price"
                                                onChange={handleInputChange}
                                                invalid={validate.price === "has-danger"}
                                                defaultValue={price}
                                            />
                                            <FormFeedback>
                                                Uh oh! Looks like you left the field empty. Please
                                                input.
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name">Category</Label>
                                            <Input
                                                type="select"
                                                name="category"
                                                id="category"
                                                placeholder="Enter Category Name"
                                                onChange={handleInputChange}
                                                invalid={validate.name === "has-danger"}
                                            >
                                                <option value="">Select Category</option>
                                                {productCategories}
                                            </Input>
                                            <FormFeedback>
                                                Uh oh! Looks like you left the field empty. Please
                                                input.
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="text-center">
                                        <Button color="primary" onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
    )
}