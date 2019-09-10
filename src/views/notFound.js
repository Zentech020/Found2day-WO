import React from "react";
import { Container, Button, Row, Col } from "shards-react";
import {Link} from 'react-router-dom';
import notFoundImg from '../images/404-notfound.png';

const notFound = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <Row className="my-4">
      <Col className="text-center my-4">
        <h2>We are sorry, but the page you requested was not found</h2>
      </Col>
    </Row>
    <Row className="my-4 flex-column">
      <Col className="text-center mx-auto my-4">
        <img width="70%" src={notFoundImg} alt="empty vacancy"/>
      </Col>
      <Col className="text-center d-flex justify-content-between w-25 mx-auto my-4">
       <Link to="/">
        <Button pill>&larr; Go back to dashboard</Button>
       </Link>

       <a href="mailto:info@found2day.nl">
        <Button pill> Contact us</Button>
       </a>
      </Col>
    </Row>
  </Container>
);

export default notFound;
