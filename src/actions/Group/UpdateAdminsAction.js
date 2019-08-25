import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const UPDATE_ADMIN_IS_LOADING = 'update_admin_is_loading';
export const UPDATE_ADMIN_DATA = 'update_admin_data';
export const UPDATE_ADMIN_ERROR = 'update_admin_error';


export const updateAdmin = (groupId, adminId, value) => async dispatch => {
  try {
    dispatch({ type: UPDATE_ADMIN_IS_LOADING });
    const result = await axios.post(`${API_URL}/groups/${groupId}/admins/${adminId}`, {
      value:value,
    },header);
    return dispatch({ type: UPDATE_ADMIN_DATA, result });
  } catch (err) {
    return dispatch({
      type: UPDATE_ADMIN_ERROR,
      payload: err
    });
  }
};
