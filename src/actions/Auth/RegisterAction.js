import axios from 'axios';
import { API_URL } from '../../constants/url';

export const REGISTER_IS_LOADING = 'register_is_loading';
export const REGISTER_DATA = 'register_data';
export const REGISTER_ERROR = 'register_error';

export const registerUser = (
  name,
  email,
  password,
  password2,
  groupName
) => async dispatch => {
  try {
    dispatch({ type: REGISTER_IS_LOADING });
    const result = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
      password2,
      groupName
    });
    return dispatch({ type: REGISTER_DATA, result, err:false });
  } catch (err) {
    return dispatch({
      type: REGISTER_ERROR,
      payload: err,
      message: "Register failed",
      err:true,
      busy:false
    });
  }
};
