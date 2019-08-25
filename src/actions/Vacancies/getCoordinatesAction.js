import axios from 'axios';

export const GET_COORDINATES_LOADING = 'get_coordinates_loading';
export const GET_COORDINATES_DATA = 'get_coordinates_data';
export const GET_COORDINATES_ERROR = 'get_coordinates_error';



export const getCoordinates = (vacancyId, history) => async dispatch => {
  try {
    dispatch({ type: GET_COORDINATES_LOADING });
    const result = await axios.get(`https://geocode.xyz/1098LJ?json=1&auth=500139784268333382234x3367`);
    return dispatch({ type: GET_COORDINATES_DATA, result , id:vacancyId});
  } catch (err) {
    return dispatch({
      type: GET_COORDINATES_ERROR,
      payload: err
    });
  }
};
