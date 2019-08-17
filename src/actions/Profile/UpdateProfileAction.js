import axios from 'axios';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const UPDATE_PROFILE_IS_LOADING = 'update_profile_is_loading';
export const UPDATE_PROFILE_DATA = 'update_profile_data';
export const UPDATE_PROFILE_ERROR = 'update_profile_error';


export const updateProfile = (profile) => async dispatch => {
  try {
    dispatch({ type: UPDATE_PROFILE_IS_LOADING });
    const result = await axios.put(`http://127.0.0.1:5000/profile/${profile._id}`, {
      name:profile.name,
      email:profile.email,
      photo: profile.photo
    },header);
    return dispatch({ type: UPDATE_PROFILE_DATA, result });
  } catch (err) {
    return dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: err
    });
  }
};
