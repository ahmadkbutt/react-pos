import { Component } from 'react';
import {
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Label,
  Input,
  Button,
} from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validate: {
        emailState: '',
        passwordState: ''
      },
      isSubmitDisabled: true
    };
  }

  handleChange = (event) => {
    const { emailState, passwordState } = this.state.validate;
    let { isSubmitDisabled } = this.state;
    (emailState === 'has-success' && passwordState === 'has-success') ? isSubmitDisabled = false : isSubmitDisabled = true;
    this.setState({ isSubmitDisabled })

    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  validateEmail = (e) => {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { validate } = this.state;

    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }

    this.setState({ validate });
  }

  validatePassword = (e) => {
    const { value } = e.target;
    const { validate } = this.state;
    value.length < 8 ? validate.passwordState = 'has-danger' : validate.passwordState = 'has-success';
    this.setState({ validate });
  }

  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${this.state.email}`);
  }

  render() {
    const { email, password, validate, isSubmitDisabled } = this.state;

    return (
      <div className="login">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@example.com"
              valid={validate.emailState === "has-success"}
              invalid={validate.emailState === "has-danger"}
              value={email}
              onChange={(e) => {
                this.validateEmail(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>
              Uh oh! Looks like there is an issue with your email. Please input
              a correct email.
            </FormFeedback>
            <FormFeedback valid>
              That's a tasty looking email you've got there.
            </FormFeedback>
            <FormText>Your username is most likely your email.</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
              value={password}
              valid={validate.passwordState === "has-success"}
              invalid={validate.passwordState === "has-danger"}
              onChange={(e) => {
                this.validatePassword(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>
              Uh oh! Not strong enough password.
            </FormFeedback>
            <FormFeedback valid>
              That's a strong password you've got there.
            </FormFeedback>
          </FormGroup>
          <Button disabled={isSubmitDisabled}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Login;