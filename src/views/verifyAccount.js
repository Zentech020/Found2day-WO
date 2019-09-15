import React, {} from 'react';
import { Container, Button, Row, Col } from 'shards-react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { verifyAccount } from '../actions';
import verifyAccountImg from '../images/verifyAccount.png';

class verifyAccountPage extends React.Component {
  componentDidMount = async() => {
    const {verifyToken , userId} = this.props.match.params;
    console.log(verifyToken);
    console.log(userId);
    await this.props.verifyAccount(verifyToken,userId)
  }
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <div className="error">
          <div className="error__content">
            <Row>
              <Col>
                <div className="d-flex flex-column align-items-center">
                  <h3>Your account is verified</h3>
                  <img className="my-4" width="50%" src={verifyAccountImg} alt="verify account img" />
                  <Link to="/login"><Button>Login</Button></Link>
                </div>
            </Col>
            </Row>
          </div>
        </div>
      </Container>
    );
  }
}

export default connect(
  null,
  { verifyAccount }
)(verifyAccountPage);
