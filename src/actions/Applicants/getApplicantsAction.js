import axios from 'axios';

export const APPLICANTS_IS_LOADING = 'applicants_is_loading';
export const APPLICANTS_DATA = 'applicants_data';
export const APPLICANTS_ERROR = 'applicants_error';

export const getApplicants = pars => async dispatch => {
  try {
    dispatch({ type: APPLICANTS_IS_LOADING });
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/users`
    );
    return dispatch({ type: APPLICANTS_DATA, result });
  } catch (err) {
    return dispatch({
      type: APPLICANTS_ERROR,
      payload: err
    });
  }
};
