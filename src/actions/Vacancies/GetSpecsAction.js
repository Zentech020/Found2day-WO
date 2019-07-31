import axios from 'axios';

export const GET_SPECS_IS_LOADING = 'get_specs_is_loading';
export const GET_SPECS_DATA = 'get_specs_data';
export const GET_SPECS_ERROR = 'get_specs_data';

export const getSpecs = vacancy_id => async dispatch => {
  try {
    dispatch({ type: GET_SPECS_IS_LOADING });
    const result = await axios.get(
      `https://api.found2day.nl/api/v1/jobseeker/search`
    );
    console.log(result);
    return dispatch({ type: GET_SPECS_DATA, result });
  } catch (err) {
    return dispatch({
      type: GET_SPECS_ERROR,
      payload: err
    });
  }
};
