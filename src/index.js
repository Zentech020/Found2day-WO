import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import thunk from 'redux-thunk';
import rootReducer from './reducers';



import * as serviceWorker from './serviceWorker';

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
    <App />
    <ToastContainer/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
