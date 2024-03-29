import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const SINGLE_VACANCY_IS_LOADING = 'single_vacancy_is_loading';
export const SINGLE_VACANCY_DATA = 'single_vacancy_data';
export const SINGLE_VACANCY_ERROR = 'single_vacancy_data';

export const getSingleVacancy = vacancy_id => async dispatch => {
  try {
    dispatch({ type: SINGLE_VACANCY_IS_LOADING });
    const result = await axios.get(
      `${API_URL}/vacancies/${vacancy_id}`,header
    );
    return dispatch({ type: SINGLE_VACANCY_DATA, result });
  } catch (err) {
    return dispatch({
      type: SINGLE_VACANCY_ERROR,
      payload: err
    });
  }
};
