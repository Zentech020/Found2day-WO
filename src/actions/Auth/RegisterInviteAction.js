import axios from 'axios';

export const REGISTER_INVITE_IS_LOADING = 'register_invite_is_loading';
export const REGISTER_INVITE_DATA = 'rregister_invite_data';
export const REGISTER_INVITE_ERROR = 'rregister_invite_error';

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
      `http://127.0.0.1:5000/auth/register/invite`,
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
