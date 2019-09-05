import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class NotAuthentication extends Component {
    componentWillMount() {
      if (this.props.authenticated) {
        this.props.history.push('/analytics');
      }
    }

    componentDidUpdate(nextProps) {
      if (this.props.authenticated) {
        this.props.history.push('/analytics');
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

  return connect(mapStateToProps)(NotAuthentication);
}
