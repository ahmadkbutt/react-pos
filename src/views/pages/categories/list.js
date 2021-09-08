import React, { Component, Fragment } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { Card, CardBody, Button, CardHeader, Row, Col } from "reactstrap";
import { toast } from "react-toastify";

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isLoading: true,
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
        isLoading: false,
      });
    });
  }

  redirectToAdd = () => {
    const { history } = this.props;
    history.push({
      pathname: "/categories/add",
    });
  };

  deleteRecord = (record) => {
    const { id } = record;
    const { api } = window;
    api
      .delete(`products/categories/${id}`, {
        force: true,
      })
      .then((response) => {
        if (response?.data) {
          toast.success("Record deleted successfully");
          this.getCategories();
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  editRecord = (record) => {
      const {id} = record;
      localStorage.setItem('category', JSON.stringify(record));
      this.props.history.push({
          pathname: `categories/${id}/edit`,
      })
  }

  render() {
    const columns = [
      {
        key: "id",
        text: "#",
        className: "name",
        align: "left",
        sortable: true,
      },
      {
        key: "name",
        text: "Name",
        className: "name",
        align: "left",
        sortable: true,
      },
      {
        key: "action",
        text: "Action",
        className: "action",
        width: 200,
        align: "left",
        sortable: false,
        cell: (record) => {
          return (
            <Fragment>
              <Button
                color="info"
                size="sm"
                onClick={() => this.editRecord(record)}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-edit"></i>
                Edit
              </Button>
              <Button
                color="danger"
                size="sm"
                onClick={() => this.deleteRecord(record)}
              >
                <i className="fa fa-trash"></i>
                Delete
              </Button>
            </Fragment>
          );
        },
      },
    ];
    const config = {
      page_size: 5,
      length_menu: [5, 10, 20],
      button: {
        excel: true,
        print: true,
        csv: true,
        filename: "categories",
      },
    };

    return (
      <Card>
        <CardHeader>
          <Row>
            <Col tag="span">Categories</Col>
            <Col className="text-right">
              <Button color="success" onClick={this.redirectToAdd}>
                Add Category
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <ReactDatatable
            config={config}
            records={this.state.categories}
            columns={columns}
            extraButtons={[]}
            loading={this.state.isLoading}
          />
        </CardBody>
      </Card>
    );
  }
}

export default CategoriesList;
