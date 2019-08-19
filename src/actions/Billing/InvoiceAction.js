import axios from 'axios';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const UP_INVOICE_IS_LOADING = 'up_invoice_is_loading';
export const UP_INVOICE_DATA = 'up_invoice_data';
export const UP_INVOICE_ERROR = 'up_invoice_data';

export const END_INVOICE_IS_LOADING = 'end_invoice_is_loading';
export const END_INVOICE_DATA = 'end_invoice_data';
export const END_INVOICE_ERROR = 'end_invoice_data';



export const getUpcomingInvoice = (customerId) => async dispatch => {
  try {
    dispatch({ type: UP_INVOICE_IS_LOADING });

    const result = await axios.get(`http://127.0.0.1:5000/billing/invoices/customer/${customerId}`);

    return dispatch({ type: UP_INVOICE_DATA, result });
  } catch (err) {
      console.log(err);
    return dispatch({
      type: UP_INVOICE_ERROR,
      payload: err
    });
  }
};

export const endInvoice = (customerId) => async dispatch => {
  try {
    dispatch({ type: END_INVOICE_IS_LOADING });
    const result = await axios.post(`http://127.0.0.1:5000/billing/existing`, {
      customerId:customerId
    },header);

    return dispatch({ type: END_INVOICE_DATA, result });
  } catch (err) {
      console.log(err);
    return dispatch({
      type: END_INVOICE_ERROR,
      payload: err
    });
  }
};
