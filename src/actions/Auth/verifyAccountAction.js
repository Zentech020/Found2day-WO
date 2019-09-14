import axios from 'axios';
import { API_URL } from '../../constants/url';
export const VERIFY_ACCOUNT_IS_LOADING = 'verify_account_is_loading';
export const VERIFY_ACCOUNT_DATA = 'verify_account_data';
export const VERIFY_ACCOUNT_ERROR = 'verify_account_error';

export const verifyAccount = (verifyToken,userId) => async dispatch => {
  try {
    dispatch({ type: VERIFY_ACCOUNT_IS_LOADING });
    const result = await axios.post(
      `${API_URL}/auth/verify`,
      {
        verifyToken: verifyToken,
        userId: userId,
      }
    );
    return dispatch({ type: VERIFY_ACCOUNT_DATA, result });
  } catch (err) {
    return dispatch({
      type: VERIFY_ACCOUNT_ERROR,
      payload: err
    });
  }
};
