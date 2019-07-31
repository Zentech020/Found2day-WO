import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, ButtonGroup } from 'shards-react';
import { NavLink } from 'react-router-dom';

import PageTitle from '../components/common/PageTitle';

import colors from '../utils/colors';

const Help = ({ smallStats }) => (
  <Container
    fluid
    className="main-content-container px-4"
    style={{ background: '#fff' }}
  >
    <Row noGutters className="page-header py-4">
      {/* Page Header :: Title */}
      <PageTitle
        title="Help"
        subtitle="Overview"
        className="text-sm-left mb-3"
      />
    </Row>
    <Row>
      <iframe
        width="100%"
        height="800px"
        frameBorder="0"
        src="https://found2day.gitbook.io/workspace/"
      />
    </Row>
  </Container>
);

export default Help;
