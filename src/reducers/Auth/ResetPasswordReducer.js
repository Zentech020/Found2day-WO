import {
  RESET_PW_IS_LOADING,
  RESET_PW_DATA,
  RESET_PW_ERROR
} from '../../actions/Auth/ResetPasswordAction';

const initialState = {
  err: '',
  isLoading: true,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PW_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case RESET_PW_DATA: {
      return {
        ...state,
        isLoading: false,
        success: true
      };
    }

    case RESET_PW_ERROR: {
      return { ...state, err: action.err };
    }

    default:
      return state;
  }
};
