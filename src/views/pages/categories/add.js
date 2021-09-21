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
import API from '../../../utils/api';

class AddCategory extends Component {
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

  handleSubmit = async () => {
    const { name, validate } = this.state;
    if (!name) {
      validate.name = "has-danger";
      this.setState({
        validate,
      });
      return;
    }
    const data = {
      name,
    };
    const category = await this.api.add(data);
    if (category) {
      toast.success('Category Added Successfully');
      this.props.history.push('/categories');
    }
  };

  render() {
    return (
      <Row>
        <Col sm="12" md={{ size: 12, offset: 2 }}>
          <Card style={{ width: "60%" }}>
            <CardHeader>
              <CardTitle className='d-inline'>Add Category</CardTitle>
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
                        placeholder="Enter Category Name"
                        onChange={this.handleInputChange}
                        invalid={this.state.validate.name === "has-danger"}
                      />
                      <FormFeedback>
                        Uh oh! Looks like you left the field empty. Please input.
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col className='text-center'>
                    <Button color="primary" onClick={this.handleSubmit}>
                      Save
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

export default AddCategory;
