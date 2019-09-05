import React, {} from 'react';
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
import { resetPasswordUser } from '../actions';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      id: '',
      password: '',
      password1: '',
      showingError: true
    };
  }

  async componentDidUpdate(nextProps) {
    if (!this.props.error && !this.state.showingError) {
      console.log('FUck');


        toast.success('Successfully Resetted password', {
          position: toast.POSITION.BOTTOM_CENTER
        });

      await this.setState({showingError: true})
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id,
      token: this.props.match.params.token
    });
  }
  onReset = async() => {
    const { password, password1, token, id } = this.state;
    if (password && password1 && token && id) {
      console.log('changing pw');
      this.props.resetPasswordUser(token, id, password, password1).then((res)=>{
        this.props.history.push('/login');
      });
      await this.setState({showingError: true})
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
  { resetPasswordUser }
)(ChangePassword);
