import React, { Component } from 'react';
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
import { resetPasswordUser } from '../actions';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      id: '',
      password: '',
      password1: ''
    };
  }
  componentDidMount() {
    this.setState({
      id: this.props.match.params.id,
      token: this.props.match.params.token
    });
  }
  onReset = () => {
    const { password, password1, token, id } = this.state;
    if (password && password1 && token && id) {
      console.log('changing pw');
      this.props.resetPasswordUser(token, id, password, password1);
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
                  alt="Shards Dashboards - Change Password Template"
                />

                {/* Title */}
                <h5 className="auth-form__title text-center mb-4">
                  Change Password
                </h5>

                {/* Form Fields */}
                <Form>
                  <FormGroup>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <FormInput
                      type="password"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={this.state.password}
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
                      value={this.state.password1}
                      onChange={e =>
                        this.setState({ password1: e.target.value })
                      }
                    />
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    onClick={() => this.onReset()}
                  >
                    Change Password
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  null,
  { resetPasswordUser }
)(ChangePassword);
