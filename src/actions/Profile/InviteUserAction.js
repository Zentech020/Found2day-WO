import axios from 'axios';

export const INVITE_USER_IS_LOADING = 'invite_user_is_loading';
export const INVITE_USER_DATA = 'invite_user_data';
export const INVITE_USER_ERROR = 'invite_user_error';

if (sessionStorage.getItem('jwtToken')) {
  var config = {
    headers: { Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken') }
  };
} else {
  var config = '';
}

export const inviteUser = (groupId, email) => async dispatch => {
  try {
    dispatch({ type: INVITE_USER_IS_LOADING });
    const result = await axios.post(
      `http://127.0.0.1:5000/groups/${groupId}/invitations`,
      {
        groupId: groupId,
        inviteeEmail: email
      },
      config
    );
    return dispatch({ type: INVITE_USER_DATA, result });
  } catch (err) {
    return dispatch({
      type: INVITE_USER_ERROR,
      payload: err
    });
  }
};
