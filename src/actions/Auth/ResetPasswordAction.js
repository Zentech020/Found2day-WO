import axios from 'axios';
import { API_URL } from '../../constants/url';
export const RESET_PW_IS_LOADING = 'reset_pw_is_loading';
export const RESET_PW_DATA = 'reset_pw_data';
export const RESET_PW_ERROR = 'reset_pw_error';

export const resetPasswordUser = (
  token,
  userId,
  newPassword1,
  newPassword2
) => async dispatch => {
  try {
    dispatch({ type: RESET_PW_IS_LOADING });
    const result = await axios.post(
      `${API_URL}/auth/reset-password`,
      {
        token: token,
        userId: userId,
        newPassword1: newPassword1,
        newPassword2: newPassword2
      }
    );
    return dispatch({ type: RESET_PW_DATA, result, err:false });
  } catch (err) {
    return dispatch({
      type: RESET_PW_ERROR,
      payload: err,
      err:true
    });
  }
};
