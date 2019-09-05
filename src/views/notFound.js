import React from "react";
import { Container, Button, Row, Col } from "shards-react";
import {Link} from 'react-router-dom';
import notFoundImg from '../images/notFound.png';

const notFound = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <Row className="my-4">
      <Col className="text-center my-4">
        <h2>We are sorry, but the page you requested was not found</h2>
      </Col>
    </Row>
    <Row className="my-4">
      <Col className="text-center my-4">
        <img width="50%" src={notFoundImg} alt="empty vacancy"/>
      </Col>
      <Col className="text-center my-4">
        <Link to="/">
        <Button pill>&larr; Go Back</Button>
       </Link>
      </Col>
    </Row>
  </Container>
);

export default notFound;
