import axios from 'axios';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const GET_DEVIATION_IS_LOADING = 'get_deviation_is_loading';
export const GET_DEVIATION_DATA = 'get_deviation_data';
export const GET_DEVIATION_ERROR = 'get_deviation_error';

export const getDeviation = (vacancyId) => async dispatch => {
  try {
    dispatch({ type: GET_DEVIATION_IS_LOADING });
    const vacancySpecs = await axios.get(`http://127.0.0.1:5000/vacancies/5d60eeb6269cec04448753d2`,header);
    const applicantSpecs = await axios.get(`https://api.found2day.nl/api/v1/applicant?apikey=lvCTJ6NhXW5ecuulidYxB63W1VphjiMv`);
    return dispatch({ type: GET_DEVIATION_DATA, vacancySpecs,applicantSpecs, err:false });
  } catch (err) {
    return dispatch({type:GET_DEVIATION_ERROR, err:true, payload:err})
  }
};
