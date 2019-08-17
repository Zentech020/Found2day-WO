import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const token = sessionStorage.getItem('jwtToken');

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    componentDidUpdate(nextProps) {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    PropTypes = {
      router: PropTypes.object
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.isAuthenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
