import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import notFound from './views/notFound';
import routes from './routes';
import { DefaultLayout, HeaderNavigation, IconSidebar } from './layouts';
import requireAuth from './helpers/require_auth';
import noRequireAuth from './helpers/no_require_auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.scss';

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ''}>
    <Switch>
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
      <Route path="*" component={notFound} />
    </Switch>
  </Router>
);
