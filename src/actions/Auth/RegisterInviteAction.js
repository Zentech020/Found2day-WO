import axios from 'axios';
import { API_URL } from '../../constants/url';
export const REGISTER_INVITE_IS_LOADING = 'register_invite_is_loading';
export const REGISTER_INVITE_DATA = 'register_invite_data';
export const REGISTER_INVITE_ERROR = 'register_invite_error';

export const registerInviteUser = (
  name,
  email,
  password,
  password2,
  groupId,
  token
) => async dispatch => {
  try {
    dispatch({ type: REGISTER_INVITE_IS_LOADING });
    const result = await axios.post(
      `${API_URL}/auth/register/invite`,
      {
        name: name,
        email: email,
        password: password,
        password2: password2,
        groupId: groupId,
        token: token
      }
    );
    return dispatch({ type: REGISTER_INVITE_DATA, result });
  } catch (err) {
    return dispatch({
      type: REGISTER_INVITE_ERROR,
      payload: err
    });
  }
};
