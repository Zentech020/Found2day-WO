import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const VACANCIES_BY_GROUP_IS_LOADING = 'vacancies_by_group_is_loading';
export const VACANCIES_BY_GROUP_DATA = 'vacancies_by_group_data';
export const VACANCIES_BY_GROUP_ERROR = 'vacancies_by_group_error';

export const getVacanciesByGroup = groupId => async dispatch => {
  try {
    dispatch({ type: VACANCIES_BY_GROUP_IS_LOADING });
    const result = await axios.get(
      `${API_URL}/vacancies/groups/${groupId}`,
      header
    );
    return dispatch({ type: VACANCIES_BY_GROUP_DATA, result });
  } catch (err) {
    return dispatch({
      type: VACANCIES_BY_GROUP_ERROR,
      payload: err
    });
  }
};
