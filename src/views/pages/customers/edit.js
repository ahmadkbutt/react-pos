import React, { Component } from "react";
import { toast } from "react-toastify";
import CustomerForm from "./components/customerForm";
import API from 'src/utils/api';
import { omit } from "underscore";

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.api = new API("customers");
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            validate: {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
            },
        };
    }

    componentDidMount = () => {
        const customer = JSON.parse(localStorage.getItem("record"));
        if (customer) {
            this.setState({
                firstName: customer.first_name,
                lastName: customer.last_name,
                email: customer.email,
                phoneNumber: customer.billing.phone
            }, this.validateForm);
        }
    };

    componentWillUnmount = () => {
        localStorage.removeItem("record");
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
        })
        return areFormValuesEmpty
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
            const { firstName, lastName, email, phoneNumber } = this.state;
            const data = {
                first_name: firstName,
                last_name: lastName,
                email,
                billing: {
                    phone: phoneNumber
                }
            };
            const { id } = JSON.parse(localStorage.getItem("record"))
            const customer = await this.api.edit(id, data);
            if (customer) {
                toast.success("Customer Edited Successfully");
                this.props.history.push("/customers");
            }
        }
    }


    render() {
        const { validate } = this.state;
        return (
            <CustomerForm type="Edit" handleSubmit={this.handleSubmit} validate={validate} handleChange={this.handleChange} defaultValue={omit(this.state, 'validate')}></CustomerForm>
        );
    }
}

export default EditCustomer;
