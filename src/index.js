import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import thunk from 'redux-thunk';
import amplitude from 'amplitude-js';
import {Helmet} from "react-helmet";
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';
var employeeAnalytics = amplitude.getInstance();
employeeAnalytics.init('bda943ff00de1ab61cd7136f237b9024');

const checkTokenExpirationMiddleware = store => next => action => {
  const token = JSON.parse(sessionStorage.getItem("jtwToken"))
    if (jwtDecode(token).exp < Date.now() / 1000) {
    next(action);
    localStorage.clear();
  }
  next(action);
};

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Maak van werk zoeken geen baan | Found2day</title>
      <meta name="description" content="Slimmer en sneller naar werk zoeken? Het kan!  Met de vacature technologie van Found2Day. Maak van werk zoeken geen baan." />
    </Helmet>
    <App />
    <ToastContainer/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
