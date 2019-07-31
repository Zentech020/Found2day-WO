import axios from 'axios';
import { API_URL } from '../../constants/url';

export const LOGIN_IS_LOADING = 'login_is_loading';
export const LOGIN_DATA = 'login_data';
export const LOGIN_ERROR = 'login_error';
export const LOGOUT_IS_LOADING = 'logout_is_loading';
export const LOGOUT_DATA = 'logout_data';
export const LOGOUT_ERROR = 'logout_error';

export const loginUser = (username, password) => async dispatch => {
  try {
    dispatch({ type: LOGIN_IS_LOADING ,busy:true, error:false});
    const result = await axios.post(`${API_URL}/auth/login`, {
      email: username,
      password: password
    });
    console.log(result)
    if(result.data.success) {
      sessionStorage.setItem('jwtToken', result.data.token);
      sessionStorage.setItem('account', JSON.stringify(result.data.account));
      sessionStorage.setItem('group', JSON.stringify(result.data.group));
      return dispatch({ type: LOGIN_DATA, result });
    }

    else {
      return dispatch({ type: LOGIN_ERROR, message: "Login failed", err:true, busy:false});
    }

  } catch (err) {
    return dispatch({
      type: LOGIN_ERROR,
      err: err
    });
  }
};

export const logoutUser = () => async dispatch => {
  try {
    dispatch({ type: LOGOUT_IS_LOADING });
    const result = await axios.get(`http://127.0.0.1:5000/auth/logout`);
    sessionStorage.clear();
    return dispatch({ type: LOGOUT_DATA, result });
  } catch (err) {
    return dispatch({
      type: LOGOUT_ERROR,
      payload: err
    });
  }
};
