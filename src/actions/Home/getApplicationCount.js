import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const APPLICATIONS_COUNT_IS_LOADING = 'applicantions_count_is_loading';
export const APPLICATIONS_COUNT_DATA = 'applicantions_count_data';
export const APPLICATIONS_COUNT_ERROR = 'applicantions_count_error';

export const getApplicationCount = (groupId) => async dispatch => {
  try {
    dispatch({ type: APPLICATIONS_COUNT_IS_LOADING });
    const result = await axios.get(
      `${API_URL}/applications/groups/${groupId}/count`,
      header
    );
    return dispatch({ type: APPLICATIONS_COUNT_DATA, result, err:false });
  } catch (err) {
    return dispatch({type:APPLICATIONS_COUNT_ERROR, err:true, payload:err})
  }
};
