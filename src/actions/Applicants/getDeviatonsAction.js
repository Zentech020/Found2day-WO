import axios from 'axios';
import {API_URL} from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const GET_DEVIATION_IS_LOADING = 'get_deviation_is_loading';
export const GET_DEVIATION_DATA = 'get_deviation_data';
export const GET_DEVIATION_ERROR = 'get_deviation_error';

export const getDeviation = (vacancyId, applicantToken) => async dispatch => {
  try {
    dispatch({ type: GET_DEVIATION_IS_LOADING });
    const vacancySpecs = await axios.get(`${API_URL}/vacancies/${vacancyId}`,header);
    const applicantSpecs = await axios.get(`https://api.found2day.nl/api/v1/applicant?apikey=${applicantToken}`);
    return dispatch({ type: GET_DEVIATION_DATA, vacancySpecs,applicantSpecs, err:false });
  } catch (err) {
    return dispatch({type:GET_DEVIATION_ERROR, err:true, payload:err})
  }
};
