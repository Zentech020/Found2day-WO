import axios from 'axios';

export const UPDATE_GROUP_IS_LOADING = 'update_group_is_loading';
export const UPDATE_GROUP_DATA = 'update_group_data';
export const UPDATE_GROUP_ERROR = 'update_group_error';


export const updateGroup = (group) => async dispatch => {
  try {
    dispatch({ type: UPDATE_GROUP_IS_LOADING });
    const result = await axios.put(`http://127.0.0.1:5000/groups/${group._id}`, {
      title:group.title,
      icon:group.icon,
    });
    return dispatch({ type: UPDATE_GROUP_DATA, result });
  } catch (err) {
    return dispatch({
      type: UPDATE_GROUP_ERROR,
      payload: err
    });
  }
};
