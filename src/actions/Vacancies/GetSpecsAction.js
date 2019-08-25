import axios from 'axios';
import { API_URL } from '../../constants/url';

export const GET_SPECS_IS_LOADING = 'get_specs_is_loading';
export const GET_SPECS_DATA = 'get_specs_data';
export const GET_SPECS_ERROR = 'get_specs_data';

export const CHANGE_SPECS_IS_LOADING = 'change_specs_is_loading';
export const CHANGE_SPECS_DATA = 'change_specs_data';
export const CHANGE_SPECS_ERROR = 'change_specs_error';


export const getSpecs = pars => async dispatch => {
  try {
    dispatch({ type: GET_SPECS_IS_LOADING });
    const result = await axios.get(
      `https://api.found2day.nl/api/v1/jobseeker/search`
    );
    return dispatch({ type: GET_SPECS_DATA, result });
  } catch (err) {
    return dispatch({
      type: GET_SPECS_ERROR,
      payload: err
    });
  }
};

export const changeSpecs = (branchID) => async (dispatch, getState) => {
    dispatch({ type: CHANGE_SPECS_IS_LOADING });
    let answersTwo = getState().Specs.specs.jobTitle;

    answersTwo = answersTwo.filter(el => branchID.includes(el.branchId))
    return dispatch({ type: CHANGE_SPECS_DATA, result:answersTwo });
}
