import {
    UP_INVOICE_IS_LOADING,
    UP_INVOICE_DATA,
    UP_INVOICE_ERROR
  } from '../../actions/Billing/InvoiceAction';
  
  const initialState = {
    success: false,
    link: '',
    err: false,
    isLoading: false
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case UP_INVOICE_IS_LOADING: {
        return { ...state, isLoading: true };
      }
  
      case UP_INVOICE_DATA: {
        return { ...state, data: action.result.data, success: true };
      }
  
      case UP_INVOICE_ERROR: {
        return { ...state, err: true, success: false };
      }
  
      default:
        return state;
    }
  };
  