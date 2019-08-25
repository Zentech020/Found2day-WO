import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const GET_PROFILE_IS_LOADING = 'get_profile_is_loading';
export const GET_PROFILE_DATA = 'get_profile_data';
export const GET_PROFILE_ERROR = 'get_profile_error';


export const getProfile = (id) => async dispatch => {
  try {
    dispatch({ type: GET_PROFILE_IS_LOADING });
    const result = await axios.get(`${API_URL}/profile/${id}`,header);
    return dispatch({ type: GET_PROFILE_DATA, result });
  } catch (err) {
    return dispatch({
      type: GET_PROFILE_ERROR,
      payload: err
    });
  }
};
