import React, { Component } from "react";
import API from "src/utils/api";
import DataTable from "src/utils/dataTable";
class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.api = new API("products/categories");
    this.state = {
      categories: [],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.getCategories()
  };

  getCategories = async () => {
    const categories = await this.api.get();
    this.setState({
      categories,
      isLoading: false
    });
  }

  render() {
    const {isLoading, categories} = this.state;
    const columns = [
      {
        key: "id",
        text: "#",
      },
      {
        key: "name",
        text: "Name",
      },
    ];

    return (
      <DataTable columns={columns} isLoading={isLoading} records={categories}
      endpoint={"products/categories"} callback = {this.getCategories}/>
    );
  }
}

export default CategoriesList;
