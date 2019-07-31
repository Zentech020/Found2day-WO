import {
  LOGIN_IS_LOADING,
  LOGIN_DATA,
  LOGIN_ERROR,
} from '../../actions/Auth/LoginAction';

export default function(
  state = {
    auth: sessionStorage.getItem('jwtToken') ? true : false,
    err: false
  },
  action
) {
  switch (action.type) {
    case LOGIN_IS_LOADING: {
      return { ...state, isLoading: true, auth: false };
    }

    case LOGIN_DATA: {
      return {
        ...state,
        isLoading: false,
        auth: action.result.data.success
      };
    }

    case LOGIN_ERROR: {
      return { ...state, err: action.err };
    }

    default:
      return state;
  }
}
