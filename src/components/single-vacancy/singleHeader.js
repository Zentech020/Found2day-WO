import React from 'react';
import PropTypes from 'prop-types';

const SingleHeader = ({ backgroundImg }) => (
  <div
    className="single-header w-100"
    style={{ backgroundImage: `url(${backgroundImg})` }}
  />
);

export default SingleHeader;
