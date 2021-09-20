import React, { Component } from "react";
import { toast } from "react-toastify";
import {
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    Row,
    Col,
} from "reactstrap";
import {AddProductForm} from './components/addForm'

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
                if(!this.props.modal){
                    this.props.history.push("/products");
                } else if(this.props.modal){
                    this.props.handleModalToggle();
                }
            }
        });
    };

    render() {
        const { categories, price, validate } = this.state;
        let productCategories;
        if (categories.length) {
            productCategories = categories.map((category, i) => {
                return <option value={category.id} key={i}>{category.name}</option>
            })
        }
        return (
            <Row>
                <Col>
                    <Card >
                        <CardHeader>
                            <CardTitle className='d-inline'>Add Product</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <AddProductForm productCategories={productCategories} price={price} validate={validate} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default AddProduct;
