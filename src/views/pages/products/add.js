import React, { Component } from "react";
import { toast } from "react-toastify";
import { omit } from "underscore";
import API from 'src/utils/api';
import ProductForm from "./components/productForm";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.api = new API("products");
        this.state = {
            categories: [],
            name: "",
            price: 0.00,
            category: "",
            validate: {
                name: "",
                price: "",
            },
        };
    }

    componentDidMount = async () => {
        this.getCategories()
    };

    getCategories = async () => {
        const api = new API("products/categories");
        const categories = await api.get();
        this.setState({
            categories,
        });
    }

    validateForm = () => {
        const { validate } = this.state;
        let areFormValuesEmpty = false;
        for (const key in validate) {
            if (!this.state[key]) {
                validate[key] = 'has-danger';
                areFormValuesEmpty = true;
            } else {
                validate[key] = 'has-success'
            }
        }
        this.setState({
            validate,
        });
        return areFormValuesEmpty;
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async () => {
        const areFormValuesEmpty = this.validateForm();
        if (!areFormValuesEmpty) {
            const { name, price, category } = this.state;
            const data = {
                name,
                regular_price: price.toString(),
                categories: [
                    {
                        id: category.id
                    }
                ]
            };
            const product = await this.api.add(data);
            if (this.props.toggleModal && this.props.callback) {
                this.props.toggleModal();
                this.props.callback()
                return;
            }
            if (product) {
                toast.success('Product Added Successfully');
                this.props.history.push('/products');
            }
        }
    }


    render() {
        const { validate, categories } = this.state;
        return (
            <ProductForm type="Add" handleSubmit={this.handleSubmit} validate={validate} handleChange={this.handleChange} defaultValue={omit(this.state, 'validate')} categories={categories} />
        )
    }
}

export default AddProduct;
