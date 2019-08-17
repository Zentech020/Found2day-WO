import axios from 'axios';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const GET_GROUP_IS_LOADING = 'get_group_is_loading';
export const GET_GROUP_DATA = 'get_group_data';
export const GET_GROUP_ERROR = 'get_group_error';


export const getGroup = (id) => async dispatch => {
  try {
    dispatch({ type: GET_GROUP_IS_LOADING });
    const result = await axios.get(`http://127.0.0.1:5000/groups/${id}`, header);
    return dispatch({ type: GET_GROUP_DATA, result });
  } catch (err) {
    return dispatch({
      type: GET_GROUP_ERROR,
      payload: err
    });
  }
};
