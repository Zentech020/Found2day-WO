import axios from 'axios';
import { API_URL } from '../../constants/url';

export const GET_COORDINATES_LOADING = 'get_coordinates_loading';
export const GET_COORDINATES_DATA = 'get_coordinates_data';
export const GET_COORDINATES_ERROR = 'get_coordinates_error';



export const getCoordinates = (postalCode , houseNumber) => async dispatch => {
  try {
    dispatch({ type: GET_COORDINATES_LOADING });
    const result = await axios.get(`${API_URL}/vacancies/location/${postalCode}/${houseNumber}`);
    return dispatch({ type: GET_COORDINATES_DATA, result });
  } catch (err) {
    return dispatch({
      type: GET_COORDINATES_ERROR,
      payload: err
    });
  }
};
