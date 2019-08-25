import axios from 'axios';
import { API_URL } from '../../constants/url';

export const PAYMENT_IS_LOADING = 'payment_is_loading';
export const PAYMENTE_DATA = 'payment_data';
export const PAYMENTS_ERROR = 'payment_data';

export const getPayLink = (
  groupId,
  amount,
  currency,
  method
) => async dispatch => {
  try {
    dispatch({ type: PAYMENT_IS_LOADING });
    const result = await axios.post(`${API_URL}/payments`, {
      groupId: groupId,
      amount: amount,
      currency: currency,
      method: method
    });
    console.log(result);
    return dispatch({ type: PAYMENTE_DATA, result });
  } catch (err) {
    return dispatch({
      type: PAYMENTS_ERROR,
      payload: err
    });
  }
};
