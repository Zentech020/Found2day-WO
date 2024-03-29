import axios from 'axios';
import {bearer} from '../../helpers/Bearer';
import {API_URL} from '../../constants/url';
const header = bearer();
export const APPLICATIONS_BY_GROUP_IS_LOADING = 'applicantions_by_group_is_loading';
export const APPLICATIONS_BY_GROUP_DATA = 'applicantions_by_group_data';
export const APPLICATIONS_BY_GROUP_ERROR = 'applicantions_by_group_error';

export const getApplicationsByGroup = (groupId) => async dispatch => {
  try {
    dispatch({ type: APPLICATIONS_BY_GROUP_IS_LOADING });
    const result = await axios.get(
      `${API_URL}/applications/groups/${groupId}`,
      header
    );
    return dispatch({ type: APPLICATIONS_BY_GROUP_DATA, result, err:false });
  } catch (err) {
    return dispatch({type:APPLICATIONS_BY_GROUP_ERROR, err:true, payload:err})
  }
};
