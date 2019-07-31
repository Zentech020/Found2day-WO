/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  FormInput,
  FormCheckbox,
  Button
} from 'shards-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/index';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      groupName: ''
    };
  }

  onRegister = () => {
    const { name, email, password, password2, groupName } = this.state;
    console.log(
      `${name} -- ${email} -- ${password} -- ${password2} -- ${groupName}`
    );
    if (name && email && password && password2 && groupName) {
      this.props.registerUser(name, email, password, password2, groupName);
    }
  };
  render() {
    return (
      <Container fluid className="main-content-container h-100 px-4">
        <Row noGutters className="h-100">
          <Col lg="3" md="5" className="auth-form mx-auto my-auto">
            <Card>
              <CardBody>
                {/* Logo */}
                <img
                  className="auth-form__logo d-table mx-auto mb-3"
                  src={require('../images/shards-dashboards-logo.svg')}
                  alt="Shards Dashboards - Register Template"
                />

                {/* Title */}
                <h5 className="auth-form__title text-center mb-4">
                  Create New Account
                </h5>

                {/* Form Fields */}
                <Form>
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <FormInput
                      type="text"
                      id="name"
                      placeholder="Enter name"
                      autoComplete="name"
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <FormInput
                      type="email"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      autoComplete="email"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <FormInput
                      type="password"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputPassword2">
                      Repeat Password
                    </label>
                    <FormInput
                      type="password"
                      id="exampleInputPassword2"
                      placeholder="Repeat Password"
                      autoComplete="new-password"
                      onChange={e =>
                        this.setState({ password2: e.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputPassword2">Group Name</label>
                    <FormInput
                      type="text"
                      id="groupName"
                      placeholder="Group Name"
                      autoComplete="Group Name"
                      onChange={e =>
                        this.setState({ groupName: e.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormCheckbox>
                      I agree with the <a href="#">Terms & Conditions</a>.
                    </FormCheckbox>
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    onClick={() => this.onRegister()}
                  >
                    Create Account
                  </Button>
                </Form>
              </CardBody>

              {/* Social Icons */}
              {/* <CardFooter>
                <ul className="auth-form__social-icons d-table mx-auto">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-github" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-google-plus-g" />
                    </a>
                  </li>
                </ul>
              </CardFooter> */}
            </Card>

            {/* Meta Details */}
            <div className="auth-form__meta d-flex mt-4">
              <Link to="/forgot-password">Forgot your password?</Link>
              <Link to="/login" className="ml-auto">
                Sign In?
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  null,
  { registerUser }
)(Register);
