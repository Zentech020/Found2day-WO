import React, {} from 'react';
import { Container, Button } from 'shards-react';

class PaymentSuccess extends React.Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <div className="error">
          <div className="error__content">
            <h3>Payment successfully</h3>
            <p>Thank you for paying , hope to see you soon. </p>
            <Button pill>&larr; Go Back to homepage</Button>
          </div>
        </div>
      </Container>
    );
  }
}

export default PaymentSuccess;
