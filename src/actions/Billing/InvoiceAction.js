import axios from 'axios';

export const UP_INVOICE_IS_LOADING = 'up_invoice_is_loading';
export const UP_INVOICE_DATA = 'up_invoice_data';
export const UP_INVOICE_ERROR = 'up_invoice_data';

export const getUpcomingInvoice = (
  customerId
) => async dispatch => {
    console.log('Hellooo');
  try {
    dispatch({ type: UP_INVOICE_IS_LOADING });
    console.log('Hellooo');
    
    const result = await axios.get(`http://127.0.0.1:5000/billing/invoices/customer/${customerId}`);
    console.log(result);
    return dispatch({ type: UP_INVOICE_DATA, result });
  } catch (err) {
      console.log(err);
    return dispatch({
      type: UP_INVOICE_ERROR,
      payload: err
    });
  }
};
