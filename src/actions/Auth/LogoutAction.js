import axios from 'axios';

export const LOGOUT_IS_LOADING = 'logout_is_loading';
export const LOGOUT_DATA = 'logout_data';
export const LOGOUT_ERROR = 'logout_error';

export const logoutUser = (username, password) => async dispatch => {
  try {
    dispatch({ type: LOGOUT_IS_LOADING });

    return dispatch({ type: LOGOUT_DATA });
    sessionStorage.removeItem('jwtToken');
  } catch (err) {
    return dispatch({
      type: LOGOUT_ERROR,
      payload: err
    });
  }
};
