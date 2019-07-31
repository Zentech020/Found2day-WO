import axios from 'axios';

export const VACANCIES_IS_LOADING = 'vacancies_is_loading';
export const VACANCIES_DATA = 'vacancies_data';
export const VACANCIES_ERROR = 'vacancies_data';

export const getVacancies = pars => async dispatch => {
  try {
    dispatch({ type: VACANCIES_IS_LOADING });
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    console.log(result);
    return dispatch({ type: VACANCIES_DATA, result });
  } catch (err) {
    return dispatch({
      type: VACANCIES_ERROR,
      payload: err
    });
  }
};
