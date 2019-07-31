import {
  LOGOUT_IS_LOADING,
  LOGOUT_DATA,
  LOGIN_ERROR
} from '../../actions/Auth/LoginAction';

const initialState = {
  err: '',
  auth: false,
  isLoading: true,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_IS_LOADING: {
      return { ...state, isLoading: true, auth: false };
    }

    case LOGOUT_DATA: {
      return {
        ...state,
        isLoading: false,
        auth: true,
        payload: action.result,
        success: action.result.data.success
      };
    }

    case LOGIN_ERROR: {
      return { ...state, err: action.err };
    }

    default:
      return state;
  }
};
