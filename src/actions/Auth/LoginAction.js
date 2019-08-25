import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const LOGIN_IS_LOADING = 'login_is_loading';
export const LOGIN_DATA = 'login_data';
export const LOGIN_ERROR = 'login_error';
export const LOGOUT_IS_LOADING = 'logout_is_loading';
export const LOGOUT_DATA = 'logout_data';
export const LOGOUT_ERROR = 'logout_error';

export const loginUser = (username, password, history) => async dispatch => {
  try {
    dispatch({ type: LOGIN_IS_LOADING ,busy:true, error:false});
    const result = await axios.post(`${API_URL}/auth/login`, {
      email: username,
      password: password
    });
    if(result.data.success) {
      sessionStorage.setItem('jwtToken', result.data.token);
      sessionStorage.setItem('account', JSON.stringify(result.data.account));
      sessionStorage.setItem('group', JSON.stringify(result.data.group));
      return dispatch({ type: LOGIN_DATA, result });
    }

    else {
      return dispatch({ type: LOGIN_ERROR, message: "Register failed", err:true, busy:false});
    }

  } catch (err) {
    return dispatch({
      type: LOGIN_ERROR,
      err: err,
      busy: false,
      message: "Login failed"
    });
  }
};

export const logoutUser = (history) => async dispatch => {
  try {
    dispatch({ type: LOGOUT_IS_LOADING });
    sessionStorage.clear();
    const result = await axios.get(`${API_URL}/auth/logout`, header);
    history.push('/login')
    return dispatch({ type: LOGOUT_DATA, result });
  } catch (err) {
    return dispatch({
      type: LOGOUT_ERROR,
      payload: err
    });
  }
};
