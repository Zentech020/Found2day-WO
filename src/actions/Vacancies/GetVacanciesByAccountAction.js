import axios from 'axios';

export const VACANCIES_BY_ACCOUNT_IS_LOADING =
  'vacancies_by_account_is_loading';
export const VACANCIES_BY_ACCOUNT_DATA = 'vacancies_by_account_data';
export const VACANCIES_BY_ACCOUNT_ERROR = 'vacancies_by_account_error';

export const getVacanciesByAccount = accountId => async dispatch => {
  try {
    dispatch({ type: VACANCIES_BY_ACCOUNT_IS_LOADING });
    const result = await axios.get(
      `http://127.0.0.1:5000/vacancies/accounts/${accountId}`
    );
    console.log(result);
    return dispatch({ type: VACANCIES_BY_ACCOUNT_DATA, result });
  } catch (err) {
    return dispatch({
      type: VACANCIES_BY_ACCOUNT_ERROR,
      payload: err
    });
  }
};
