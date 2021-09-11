import React, { Component } from "react";
import { toast } from "react-toastify";
import {
    Card,
    CardBody,
    CardTitle,
    CardHeader,
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

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            name: "",
            price: 0,
            category: "",
            validate: {
                name: "",
                price: "",
                category: ""
            },
        };
    }

    componentDidMount = () => {
        this.getCategories();
    };

    getCategories = () => {
        const { api } = window;
        api.get("products/categories").then((res) => {
            const { data } = res;
            this.setState({
                categories: data,
            });
        });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        const { validate } = this.state;

        if (value.length) {
            validate[name] = '';
        }

        this.setState({
            [name]: value,
            validate
        });

    };

    handleSubmit = () => {
        const { name, price, category, validate } = this.state;
        const { api } = window;

        if (!name) {
            validate.name = "has-danger";
            this.setState({
                validate,
            });
            return;
        }

        const data = {
            name,
            regular_price: price.toString(),
            categories: [
                {
                    id: parseInt(category)
                }
            ]
        };

        api.post("products", data).then((res) => {
            if (res?.data) {
                toast.success("Product Added Successfully");
                this.props.history.push("/products");
            }
        });
    };

    render() {
        const { categories } = this.state;
        let productCategories;
        if (categories.length) {
            productCategories = categories.map((category, i) => {
                return <option value={category.id} key={i}>{category.name}</option>
            })
        }
        return (
            <Row>
                <Col sm="12" md={{ size: 12, offset: 2 }}>
                    <Card style={{ width: "60%" }}>
                        <CardHeader>
                            <CardTitle className='d-inline'>Add Product</CardTitle>
                        </CardHeader>
                        <CardBody>
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
                                                onChange={this.handleInputChange}
                                                invalid={this.state.validate.name === "has-danger"}
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
                                                onChange={this.handleInputChange}
                                                invalid={this.state.validate.price === "has-danger"}
                                                defaultValue={this.state.price}
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
                                                onChange={this.handleInputChange}
                                                invalid={this.state.validate.name === "has-danger"}
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
                                        <Button color="primary" onClick={this.handleSubmit}>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default AddProduct;
