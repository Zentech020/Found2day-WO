import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();

export const GET_APPLICANTS_TIME_IS_LOADING = 'get_applicants_time_is_loading';
export const GET_APPLICANTS_TIME_DATA = 'get_applicants_time_data';
export const GET_APPLICANTS_TIME_ERROR = 'get_applicants_time_error';

export const GET_VISIBLE_VACANCIES_IS_LOADING = 'get_visisble_vacancies_is_loading';
export const GET_VISIBLE_VACANCIES_DATA = 'get_visisble_vacancies_data';
export const GET_VISIBLE_VACANCIES_ERROR = 'get_visisble_vacancies_error';


export const getApplicantsTime = (groupId, startDate, endDate) => async dispatch => {
  try {
    dispatch({ type: GET_APPLICANTS_TIME_IS_LOADING });
    const result = await axios.get(`${API_URL}/applications/statistics/${groupId}/${startDate}/${endDate}`,header);
    return dispatch({ type: GET_APPLICANTS_TIME_DATA, result });
  } catch (err) {
    return dispatch({
      type: GET_APPLICANTS_TIME_ERROR,
      payload: err
    });
  }
};

export const getVisibleVacancies = (groupId) => async dispatch => {
  try {
    dispatch({type:GET_VISIBLE_VACANCIES_IS_LOADING});
    const result = await axios.get(`${API_URL}/vacancies/groups/${groupId}/count-visble`,header);
    return dispatch({ type: GET_VISIBLE_VACANCIES_DATA, result });
  } catch(err) {
    return dispatch({
      type: GET_VISIBLE_VACANCIES_ERROR,
      payload: err
    });
  }
}
