import React, { Component } from "react";
import { toast } from "react-toastify";
import API from 'src/utils/api';
import { omit } from "underscore";
import ProductForm from "./components/productForm";

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.api = new API("products");
        this.state = {
            categories: [],
            name: "",
            price: 0,
            category: '',
            validate: {
                name: "",
                price: "",
                category: ""
            },
        };
    }

    componentDidMount = () => {
        const product = JSON.parse(localStorage.getItem("record"));
        if (product) {
            const { name, price, categories } = product;
            this.setState({
                name,
                price: parseInt(price),
                category: {
                    name: categories[0].name,
                    id: categories[0].id
                }
            })
        }

        this.getCategories();
    };

    componentWillUnmount = () => {
        localStorage.removeItem("record");
    }

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
            const { id } = JSON.parse(localStorage.getItem("record"))
            const product = await this.api.edit(id, data);
            if (product) {
                toast.success("Product Edited Successfully");
                this.props.history.push("/products");
            }
        }
    }

    render() {
        const { validate, categories } = this.state;
        return (
            <ProductForm type="Edit" handleSubmit={this.handleSubmit} validate={validate} handleChange={this.handleChange} defaultValue={omit(this.state, 'validate')} categories={categories} />
        )
    }
}

export default EditProduct;
