import React, {} from 'react';
import { Container, Button } from 'shards-react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { logoutUser } from '../actions';

class Logout extends React.Component {
  componentDidMount() {
    this.props.logoutUser();
  }
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <div className="error">
          <div className="error__content">
            <h3>Loggin out...</h3>
            <p>There was a problem on our end. Please try again later.</p>
            <Link><Button pill>&larr; Go Back</Button></Link>
          </div>
        </div>
      </Container>
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(Logout);
