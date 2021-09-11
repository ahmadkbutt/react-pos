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
} from "reactstrap";

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            name: "",
            price: 0,
            category: "",
            categoryId: '',
            validate: {
                name: "",
                price: "",
                category: ""
            },
        };
    }

    componentDidMount = () => {
        const product = JSON.parse(localStorage.getItem("product"));
        if (product) {
            this.setState({
                name: product.name,
                price: product.price,
                category: product.categories[0].name,
                categoryId: product.categories[0].id
            });
        }
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

    componentWillUnmount = () => {
        localStorage.removeItem("product");
      }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        const { validate } = this.state;

        if (value.length) {
            validate[name] = '';
        }

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = () => {
        const product = JSON.parse(localStorage.getItem("product"));
        const { name, price, categoryId, validate } = this.state;
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
                    id: parseInt(categoryId)
                }
            ]
        };

        api.put(`products/${product.id}`, data).then((res) => {
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
                let isSelected = false
                if(category.name === this.state.category){
                    isSelected = true
                }
                return <option selected={isSelected} value={category.id} key={i}>{category.name}</option>
            })
        }
        return (
            <Row>
                <Col sm="12" md={{ size: 12, offset: 2 }}>
                    <Card style={{ width: "60%" }}>
                        <CardHeader>
                            <CardTitle className='d-inline'>Edit Product</CardTitle>
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
                                                defaultValue={this.state.name}
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
                                                value={parseInt(this.state.price)}
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
                                                name="categoryId"
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

export default EditProduct;
