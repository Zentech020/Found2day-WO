import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const INVITE_USER_IS_LOADING = 'invite_user_is_loading';
export const INVITE_USER_DATA = 'invite_user_data';
export const INVITE_USER_ERROR = 'invite_user_error';


export const inviteUser = (groupId, email) => async dispatch => {
  try {
    dispatch({ type: INVITE_USER_IS_LOADING });
    const result = await axios.post(
      `${API_URL}/groups/${groupId}/invitations`,
      {
        groupId: groupId,
        inviteeEmail: email
      },
      header
    );
    return dispatch({ type: INVITE_USER_DATA, result });
  } catch (err) {
    return dispatch({
      type: INVITE_USER_ERROR,
      payload: err
    });
  }
};
