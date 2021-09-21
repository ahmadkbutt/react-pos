import React, { Component } from "react";
import { toast } from "react-toastify";
import API from "src/utils/api";
import CategoryForm from './components/categoryForm';
import { omit } from "underscore";
class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.api = new API("products/categories");
    this.state = {
      name: "",
      validate: {
        name: "",
      },
    };
  }

  componentDidMount = () => {
    const record = JSON.parse(localStorage.getItem("record"));
    if (record) {
      const { name } = record;
      this.setState({
        name: name,
      });
    }
  };

  componentWillUnmount = () => {
    localStorage.removeItem("record");
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
    const { id } = JSON.parse(localStorage.getItem("record"))
    const category = await this.api.edit(id, data);
    if (category) {
      toast.success("Category Edited Successfully");
      this.props.history.push("/categories");
    }
  }

  render() {
    const { validate } = this.state;
    return (
      <CategoryForm type="Edit" handleSubmit={this.handleSubmit} validate={validate} handleChange={this.handleChange} defaultValue={omit(this.state, 'validate')}></CategoryForm>
    );
  }
}

export default EditCategory;
