import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button
} from 'shards-react';
import { connect } from 'react-redux';
import { forgetPasswordUser } from '../actions';

class forgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      btnSend: true,
      showingError: true
    };
  }

  async componentDidUpdate(nextProps) {
    if (!this.props.error && !this.state.showingError) {
        await toast.success('Reset email is on the way', {
          position: toast.POSITION.BOTTOM_CENTER
        });

      await this.setState({showingError: true})
    }
  }

  onSubmit = async() => {
    const { email } = this.state;
    if (email) {
      this.props.forgetPasswordUser(email);
      await this.setState({showingError: false})
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
                  src="https://logo.clearbit.com/found2day.nl"
                  alt="Shards Dashboards - Register Template"
                />

                {/* Title */}
                <h5 className="auth-form__title text-center mb-4">
                  Reset Password
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
                      value={this.state.email}
                      onChange={e =>
                        this.setState({ email: e.target.value, btnSend: false })
                      }
                    />
                    <small className="form-text text-muted text-center">
                      You will receive an email with a unique token.
                    </small>
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    onClick={() => this.onSubmit()}
                    disabled={this.state.btnSend}
                  >
                    Reset Password
                  </Button>
                </Form>
              </CardBody>
            </Card>

            {/* Meta Details */}
            <div className="auth-form__meta d-flex mt-4">
              <Link to="/login" className="mx-auto">
                Take me back to login.
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
  { forgetPasswordUser }
)(forgotPassword);
