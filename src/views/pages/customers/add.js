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

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            validate: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
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

    handleSubmit = () => {
        const { firstName, lastName, email, phone, validate } = this.state;
        const { api } = window;
        for (const key in validate) {
            if (!this.state[key].length) {
                validate[key] = 'has-danger';
            } else validate[key] = ''
        }

        this.setState({ validate })

        const data = {
            first_name: firstName,
            last_name: lastName,
            email,
            billing: {
                phone
            }
        };

        if (firstName && lastName && email && phone) {
            api.post("customers", data).then((res) => {
                if (res?.data) {
                    toast.success('Customer Added Successfully');
                    this.props.history.push('/customers');
                }
            }).catch(err => {
                toast.error('invalid input details')
            })
        }
    };

    validateEmail = (e) => {
        const emailRex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const { validate } = this.state;

        if (emailRex.test(e.target.value)) {
            validate.email = 'has-success';
        } else {
            validate.email = 'has-danger';
        }

        this.setState({ validate });
    }

    render() {
        return (
            <Row>
                <Col sm="12" md={{ size: 12, offset: 2 }}>
                    <Card style={{ width: "60%" }}>
                        <CardHeader>
                            <CardTitle className='d-inline'>Add Customer</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name">First Name</Label>
                                            <Input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                placeholder="Enter First Name"
                                                onChange={this.handleInputChange}
                                                invalid={this.state.validate.firstName === "has-danger"}
                                            />
                                            <FormFeedback>
                                                Uh oh! Looks like you left the field empty. Please input.
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name">Last Name</Label>
                                            <Input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                placeholder="Enter Last Name"
                                                onChange={this.handleInputChange}
                                                invalid={this.state.validate.lastName === "has-danger"}
                                            />
                                            <FormFeedback>
                                                Uh oh! Looks like you left the field empty. Please input.
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name">Email</Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                id="exampleEmail"
                                                placeholder="example@example.com"
                                                valid={this.state.validate.email === "has-success"}
                                                invalid={this.state.validate.email === "has-danger"}
                                                value={this.state.email}
                                                onChange={(e) => {
                                                    this.validateEmail(e);
                                                    this.handleInputChange(e);
                                                }}
                                            />
                                            <FormFeedback>
                                                Uh oh! Looks like you left the field empty. Please input.
                                            </FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name">Phone No#</Label>
                                            <Input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                placeholder="Enter Phone Number"
                                                onChange={this.handleInputChange}
                                                invalid={this.state.validate.phone === "has-danger"}
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
                                            Submit
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

export default AddCustomer;
