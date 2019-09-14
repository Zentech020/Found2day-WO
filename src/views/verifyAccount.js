import React, {} from 'react';
import { Container, Button } from 'shards-react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { verifyAccount } from '../actions';

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
            <h3>Loggin out...</h3>
            <p>There was a problem on our end. Please try again later.</p>
            <Link to="/login"><Button>Login</Button></Link>
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
