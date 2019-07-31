import {
  FORGOT_PW_IS_LOADING,
  FORGOT_PW_DATA,
  FORGOT_PW_ERROR
} from '../../actions/Auth/ForgotPasswordAction';

const initialState = {
  err: '',
  isLoading: true,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PW_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case FORGOT_PW_DATA: {
      return {
        ...state,
        isLoading: false,
        success: true
      };
    }

    case FORGOT_PW_ERROR: {
      return { ...state, err: action.err };
    }

    default:
      return state;
  }
};
