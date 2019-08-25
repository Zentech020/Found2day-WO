import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const VACANCIES_COUNT_IS_LOADING = 'vacancies_count_is_loading';
export const VACANCIES_COUNT_DATA = 'vacancies_count_data';
export const VACANCIES_COUNT_ERROR = 'vacancies_count_error';

export const getVacancyCount = (groupId) => async dispatch => {
  try {
    dispatch({ type: VACANCIES_COUNT_IS_LOADING });
    const result = await axios.get(
      `${API_URL}/vacancies/groups/${groupId}/count`,
      header
    );
    return dispatch({ type: VACANCIES_COUNT_DATA, result, err:false });
  } catch (err) {
    return dispatch({type:VACANCIES_COUNT_ERROR, err:true, payload:err})
  }
};
