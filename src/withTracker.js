import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import { connect } from 'react-redux';

GoogleAnalytics.initialize(process.env.REACT_APP_GAID || 'UA-115105611-2');

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    GoogleAnalytics.set({
      page,
      ...options
    });
    GoogleAnalytics.pageview(page);
  };

  const BASENAME = process.env.REACT_APP_BASENAME || '';

  // eslint-disable-next-line
  const HOC = class extends Component {
    componentDidMount() {
      console.log(this.props.authenticated);
      // eslint-disable-next-line
      // const page = this.props.location.pathname + this.props.location.search;
      // trackPage(`${BASENAME}${page}`);

      if (this.props.authenticated) {
        this.props.history.push('/analytics');
      }

      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  function mapStateToProps(state) {
    return { authenticated: state.login.auth };
  }

  return connect(mapStateToProps)(HOC);
};

export default withTracker;
