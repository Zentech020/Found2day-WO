import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "shards-react";

const FormSectionTitle = ({ title, description, linkText, linkUrl }) => (
  <Row form className="mx-4">
    <Col className="mb-3">
      <h6 className="form-text m-0">{title}</h6>
      <p className="form-text text-muted m-0">{description} <a target="_blank" href={linkUrl}>{linkText}</a> </p>

    </Col>
  </Row>
);

FormSectionTitle.propTypes = {
  /**
   * The form section's title.
   */
  title: PropTypes.string,
  /**
   * The form section's description.
   */
  description: PropTypes.string,
  linkText: PropTypes.string,
  linkUrl: PropTypes.string,
};

FormSectionTitle.defaultProps = {
  title: "Title",
  description: "Description",
  linkText: "",
  linkUrl: "",
};

export default FormSectionTitle;
