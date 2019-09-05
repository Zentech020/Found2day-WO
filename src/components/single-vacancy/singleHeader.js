import React from 'react';

const SingleHeader = ({ backgroundImg }) => (
  <div
    className="single-header w-100"
    style={{ backgroundImage: `url(${backgroundImg})` }}
  />
);

export default SingleHeader;
