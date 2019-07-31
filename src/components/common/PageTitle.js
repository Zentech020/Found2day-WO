import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Col } from 'shards-react';

const PageTitle = ({ title, subtitle, description, htmlDecription, className, ...attrs }) => {
  const classes = classNames(
    className,
    'text-center',
    'text-md-left',
    'mb-sm-0'
  );

  return (
    <Col xs="12" sm="6" className={classes} {...attrs}>
      <span className="text-uppercase page-subtitle">{subtitle}</span>
      <h3 className="page-title">{title}</h3>
      <p className="page-description mt-2">{description}</p>
      <div dangerouslySetInnerHTML={{__html: htmlDecription}}/>
    </Col>
  );
};

PageTitle.propTypes = {
  /**
   * The page title.
   */
  title: PropTypes.string,
  /**
   * The page subtitle.
   */
  subtitle: PropTypes.string,
  description: PropTypes.string
};

export default PageTitle;
