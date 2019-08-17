import axios from 'axios';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const DELETE_VACANCY_IS_LOADING = 'delete_vacancy_is_loading';
export const DELETE_VACANCY_DATA = 'delete_vacancy_data';
export const DELETE_VACANCY_ERROR = 'delete_vacancy_error';



export const deleteSingleVacancy = (vacancyId, history) => async dispatch => {
  try {
    dispatch({ type: DELETE_VACANCY_IS_LOADING });
    const result = await axios.delete(
      `http://127.0.0.1:5000/vacancies/${vacancyId}`,
      header
    );
    return dispatch({ type: DELETE_VACANCY_DATA, result , id:vacancyId});
  } catch (err) {
    return dispatch({
      type: DELETE_VACANCY_ERROR,
      payload: err
    });
  }
};
