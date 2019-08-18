import {
  PAYMENT_IS_LOADING,
  PAYMENTE_DATA,
  PAYMENTS_ERROR
} from '../../actions/Billing/PaymentAction';

const initialState = {
  success: false,
  link: '',
  err: false,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case PAYMENTE_DATA: {
      return { ...state, link: action.result.data.mollieLink, success: true };
    }

    case PAYMENTS_ERROR: {
      const { data } = action.res;
      return { ...state, err: true, success: false };
    }

    default:
      return state;
  }
};
