import axios from 'axios';

export const GET_MEMBERS_IS_LOADING = 'get_members_is_loading';
export const GET_MEMBERS_DATA = 'get_members_data';
export const GET_MEMBERS_ERROR = 'get_members_error';


export const getMembers = (id) => async dispatch => {
  try {
    dispatch({ type: GET_MEMBERS_IS_LOADING });
    const result = await axios.get(`http://127.0.0.1:5000/groups/${id}/members`);
    return dispatch({ type: GET_MEMBERS_DATA, result });
  } catch (err) {
    return dispatch({
      type: GET_MEMBERS_ERROR,
      payload: err
    });
  }
};
