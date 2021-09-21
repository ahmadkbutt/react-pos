import React, { Component } from "react";
import { toast } from "react-toastify";
import CustomerForm from './components/customerForm';
import { omit } from "underscore";
import API from 'src/utils/api';
import { removeSpacesFromString } from "src/helper/helper";

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.api = new API("customers");
        this.randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            validate: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
            },
        };
    }

    componentDidMount() {
        this.setEmail();
    }

    setEmail = () => {
        const { firstName, lastName } = this.state;
        const email = removeSpacesFromString(`${firstName}.${lastName}${this.randomNumber}@example.com`);
        this.setState({
            email
        })
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
        }, this.setEmail)
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
            const customer = await this.api.add(data);
            if (customer) {
                toast.success('Customer Added Successfully');
                this.props.history.push('/customers');
            }
        }
    }

    render() {
        const { validate } = this.state;
        return (
            <CustomerForm type="Add" handleSubmit={this.handleSubmit} validate={validate} handleChange={this.handleChange} defaultValue={omit(this.state, 'validate')}></CustomerForm>
        );
    }
}

export default AddCustomer;
