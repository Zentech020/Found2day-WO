/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
import Loader from '../components/Animations/Loader';
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
import { connect } from 'react-redux';
import { loginUser } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showingError: false
    };
  }

  async componentDidUpdate(nextProps) {
    if (this.props.error && !this.state.showingError) {
      console.log('FUck');
      if (this.props.message) {

        toast.error(this.props.message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      } else {
        toast.error('Oops', {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      await this.setState({showingError: true})
    }
  }

  onLogin = async () => {
    const { username, password } = this.state;
    if (username && password) {
      this.props.loginUser(username, password).then((res)=> {
        this.setState({showingError: false})
        window.location.reload();
      });


      // await this.props.history.push(`/analytics`);
    }

    else {
      toast.error('Please enter all the fields', {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  render() {
    const {busy} = this.props;

    return (
      <Container fluid className="main-content-container h-100 px-4">

        <Row noGutters className="h-100">
          <Col lg="3" md="5" className="auth-form mx-auto my-auto">
          {busy ? (<Loader/>) : (null)}
            <Card>
              <CardBody>
                {/* Logo */}
                <img
                  className="auth-form__logo d-table mx-auto mb-3"
                  src={require('../images/shards-dashboards-logo.svg')}
                  alt="Shards Dashboards - Login Template"
                />

                {/* Title */}
                <h5 className="auth-form__title text-center mb-4">
                  Access Your Account
                </h5>

                {/* Form Fields */}

                <Form>
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <FormInput
                      type="email"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      autoComplete="email"
                      value={this.state.username}
                      onChange={e =>
                        this.setState({ username: e.target.value, changed: true })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <FormInput
                      type="password"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={this.state.password}
                      onChange={e =>
                        this.setState({ password: e.target.value, changed: true })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormCheckbox>Remember me for 30 days.</FormCheckbox>
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    // type="submit"
                    onClick={() => {this.onLogin()}}
                  >
                    Access Account
                  </Button>
                </Form>
              </CardBody>

            </Card>

            {/* Meta Details */}
            <div className="auth-form__meta d-flex mt-4">
              <Link to="/forgot-password">Forgot your password?</Link>
              <Link to="/register" className="ml-auto">
                Create a new account?
              </Link>
            </div>
          </Col>
        </Row>

      </Container>
    );
  }
}

//Connect redux
function mapStateToProps(state) {
  return {
    error: state.auth.err,
    message:state.auth.message,
    busy:state.auth.busy
  };
}

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
