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

class EditCategory extends Component {
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

    componentDidMount = () => {
        const customer = JSON.parse(localStorage.getItem("customer"));
        if (customer) {
            this.setState({
                firstName: customer.first_name,
                lastName: customer.last_name,
                email: customer.email,
                phone: customer.billing.phone
            });
        }
    };

    componentWillUnmount = () => {
        localStorage.removeItem("customer");
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
            const customer = JSON.parse(localStorage.getItem("customer"));
            api.put(`customers/${customer.id}`, data).then((res) => {
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
        const { firstName, lastName, email, phone, validate } = this.state;
        return (
            <Row>
                <Col sm="12" md={{ size: 12, offset: 1 }}>
                    <Card style={{ width: "80%" }}>
                        <CardHeader>
                            <CardTitle className='d-inline'>Edit Customer</CardTitle>
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
                                                invalid={validate.firstName === "has-danger"}
                                                defaultValue={firstName}
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
                                                defaultValue={lastName}
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
                                                valid={validate.email === "has-success"}
                                                invalid={validate.email === "has-danger"}
                                                defaultValue={email}
                                                onChange={(e) => {
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
                                                defaultValue={phone}
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

export default EditCategory;
