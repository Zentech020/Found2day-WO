import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from './routes';
import withTracker from './withTracker';
import rootReducer from './reducers';
import requireAuth from './helpers/require_auth';
import noRequireAuth from './helpers/no_require_auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.scss';

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ''}>
    <div>
      {routes.map((route, index) => {
        if (route.needsAuth) {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={requireAuth(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        } else {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={noRequireAuth(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        }
      })}
    </div>
  </Router>
);
