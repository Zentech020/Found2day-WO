import axios from 'axios';

export const GET_PROFILE_IS_LOADING = 'get_profile_is_loading';
export const GET_PROFILE_DATA = 'get_profile_data';
export const GET_PROFILE_ERROR = 'get_profile_error';


export const getProfile = (id) => async dispatch => {
  try {
    dispatch({ type: GET_PROFILE_IS_LOADING });
    const result = await axios.get(`http://127.0.0.1:5000/profile/${id}`);
    return dispatch({ type: GET_PROFILE_DATA, result });
  } catch (err) {
    return dispatch({
      type: GET_PROFILE_ERROR,
      payload: err
    });
  }
};
