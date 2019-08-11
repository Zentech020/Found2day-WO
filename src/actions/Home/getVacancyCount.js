import axios from 'axios';

export const VACANCIES_COUNT_IS_LOADING = 'vacancies_count_is_loading';
export const VACANCIES_COUNT_DATA = 'vacancies_count_data';
export const VACANCIES_COUNT_ERROR = 'vacancies_count_error';

export const getVacancyCount = (groupId) => async dispatch => {
  try {
    dispatch({ type: VACANCIES_COUNT_IS_LOADING });
    const result = await axios.get(
      `http://127.0.0.1:5000/vacancies/groups/${groupId}/count`
    );
    return dispatch({ type: VACANCIES_COUNT_DATA, result, err:false });
  } catch (err) {
    return dispatch({type:VACANCIES_COUNT_ERROR, err:true, payload:err})
  }
};
