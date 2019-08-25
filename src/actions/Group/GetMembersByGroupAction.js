import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const MEMBERS_BY_GROUP_IS_LOADING = 'members_by_group_is_loading';
export const MEMBERS_BY_GROUP_DATA = 'members_by_group_data';
export const MEMBERS_BY_GROUP_ERROR = 'members_by_group_error';

export const getMembersByGroup = groupId => async dispatch => {
  try {
    dispatch({ type: MEMBERS_BY_GROUP_IS_LOADING });
    const result = await axios.get(
      `${API_URL}/groups/${groupId}/members`,
      header
    );
    return dispatch({ type: MEMBERS_BY_GROUP_DATA, result });
  } catch (err) {
    return dispatch({
      type: MEMBERS_BY_GROUP_ERROR,
      payload: err
    });
  }
};
