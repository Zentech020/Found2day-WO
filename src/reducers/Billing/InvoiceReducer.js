import {
    UP_INVOICE_IS_LOADING,
    UP_INVOICE_DATA,
    UP_INVOICE_ERROR,
    INVOICES_IS_LOADING,
    INVOICES_DATA,
    INVOICES_ERROR,
    END_INVOICE_IS_LOADING,
    END_INVOICE_DATA,
    END_INVOICE_ERROR
  } from '../../actions/Billing/InvoiceAction';



  const initialState = {
    success: false,
    link: '',
    err: false,
    isLoading: false,
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case UP_INVOICE_IS_LOADING: {
        return { ...state, isLoading: true };
      }

      case UP_INVOICE_DATA: {
          return { ...state, upcomingInvoices: action.result.data, success: true };
      }

      case UP_INVOICE_ERROR: {
        return { ...state, err: true, success: false };
      }

      case INVOICES_IS_LOADING: {
        return { ...state, isLoading: true };
      }

      case INVOICES_DATA: {
          return { ...state, allInvoices: action.result.data.invoices.data, success: true, isLoading: false };
      }

      case INVOICES_ERROR: {
        return { ...state, err: true, success: false };
      }

      case END_INVOICE_IS_LOADING: {
        return { ...state, isLoading: true };
      }

      case END_INVOICE_DATA: {
        return { ...state, upcomingInvoice: action.result.data, success: true };
      }

      case END_INVOICE_ERROR: {
        return { ...state, err: true, success: false };
      }

      default:
        return state;
    }
  };
