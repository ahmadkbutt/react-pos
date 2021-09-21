import React, { Component } from "react";
import { toast } from "react-toastify";
import API from '../../../utils/api';
import CategoryForm from './components/categoryForm';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.api = new API("products/categories");
    this.state = {
      name: '',
      validate: {
        name: '',
      },
    };
  }

  validateForm = () => {
    const { validate } = this.state;
    for (const key in validate) {
      if (!this.state[key]) {
        validate[key] = 'has-danger'
      } else {
        validate[key] = 'has-success'
      }
    }
    this.setState({
      validate,
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async () => {
    const { name } = this.state;
    this.validateForm();
    const data = { name };
    const category = await this.api.add(data);
    if (category) {
      toast.success('Category Added Successfully');
      this.props.history.push('/categories');
    }
  }

  render() {
    const { validate } = this.state;
    return (
      <CategoryForm type="Add" handleSubmit={this.handleSubmit} validate={validate} handleChange={this.handleChange}></CategoryForm>
    );
  }
}

export default AddCategory;
