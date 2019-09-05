import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const UPDATE_GROUP_IS_LOADING = 'update_group_is_loading';
export const UPDATE_GROUP_DATA = 'update_group_data';
export const UPDATE_GROUP_ERROR = 'update_group_error';


export const updateGroup = (group) => async dispatch => {
  try {
    dispatch({ type: UPDATE_GROUP_IS_LOADING });
    const result = await axios.put(`${API_URL}/groups/${group._id}`, {
      title:group.title,
      icon:group.icon,
      kvk:group.kvk,
      address:group.address,
      city:group.city,
      zip:group.zip
    },
    header);
    return dispatch({ type: UPDATE_GROUP_DATA, result });
  } catch (err) {
    return dispatch({
      type: UPDATE_GROUP_ERROR,
      payload: err
    });
  }
};
