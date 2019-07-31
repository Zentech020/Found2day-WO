import axios from 'axios';
import { API_URL } from '../../constants/url';
export const FORGOT_PW_IS_LOADING = 'forgot_pw_is_loading';
export const FORGOT_PW_DATA = 'forgot_pw_data';
export const FORGOT_PW_ERROR = 'forgot_pw_error';

export const forgetPasswordUser = email => async dispatch => {
  try {
    dispatch({ type: FORGOT_PW_IS_LOADING });
    const result = await axios.post(`${API_URL}/forgot-password`, {
      email: email
    });
    return dispatch({ type: FORGOT_PW_DATA, result });
  } catch (err) {
    return dispatch({
      type: FORGOT_PW_ERROR,
      payload: err
    });
  }
};
