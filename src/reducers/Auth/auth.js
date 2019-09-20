import {
  LOGIN_IS_LOADING,
  LOGIN_DATA,
  LOGIN_ERROR,
} from '../../actions/Auth/LoginAction';

import {
  REGISTER_IS_LOADING,
  REGISTER_DATA,
  REGISTER_ERROR
} from '../../actions/Auth/RegisterAction';

import {
  LOGOUT_IS_LOADING,
  LOGOUT_DATA,
  LOGOUT_ERROR
} from '../../actions/Auth/LoginAction';

import {
  FORGOT_PW_IS_LOADING,
  FORGOT_PW_DATA,
  FORGOT_PW_ERROR
} from '../../actions/Auth/ForgotPasswordAction';

import {
  RESET_PW_IS_LOADING,
  RESET_PW_DATA,
  RESET_PW_ERROR
} from '../../actions/Auth/ResetPasswordAction';

import {
  REGISTER_INVITE_IS_LOADING,
  REGISTER_INVITE_DATA,
  REGISTER_INVITE_ERROR
} from '../../actions/Auth/RegisterInviteAction';

import {
  VERIFY_ACCOUNT_IS_LOADING,
  VERIFY_ACCOUNT_DATA,
  VERIFY_ACCOUNT_ERROR
} from '../../actions/Auth/verifyAccountAction';

export default function(
  state = {
    isLoading:false,
    isAuthenticated: sessionStorage.getItem('jwtToken') ? true : false,
    err: false,
    message:'',
    busy:false,
  },
  action
) {
  switch (action.type) {
    case LOGIN_IS_LOADING: {
      return { ...state, isLoading: true, err:action.error, isAuthenticated: false, busy:true};
    }

    case LOGIN_DATA: {
      return {
        ...state,
        err:false,
        isLoading: false,
        isAuthenticated: true
      };
    }

    case LOGIN_ERROR: {
      return { ...state, err: action.err, message:action.message, busy:false };
    }

    case REGISTER_IS_LOADING: {
      return { ...state, isLoading: true, isAuthenticated: false };
    }

    case REGISTER_DATA: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        message: action.result.data
      };
    }

    case REGISTER_ERROR: {
      return { ...state, err: action.err };
    }

    case LOGOUT_IS_LOADING: {
      return { ...state, isLoading: true, auth: false };
    }

    case LOGOUT_DATA: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }

    case LOGOUT_ERROR: {
      return { ...state, err: action.err };
    }

    case FORGOT_PW_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case FORGOT_PW_DATA: {
      return {
        ...state,
        isLoading: false,
        err:false,
        message:'Reset email is on the way',
      };
    }

    case FORGOT_PW_ERROR: {
      return { ...state, err: true, message:'Something went wront , try again!' };
    }

    case RESET_PW_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case RESET_PW_DATA: {
      return {
        ...state,
        isLoading: false,
        message:'succesfully reset password!',
        err:false,
      };
    }

    case RESET_PW_ERROR: {
      return { ...state, err: true , isLoading: false,  message:'failed to reset password, please try again in a couple minutes'};
    }

    case REGISTER_INVITE_IS_LOADING: {
      return { ...state, isLoading: true, isAuthenticated: false };
    }

    case REGISTER_INVITE_DATA: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        err:false,
        message:'succesfully registerd please login!'
      };
    }

    case REGISTER_INVITE_ERROR: {
      const {message} = action.payload.response.data;
      console.log("message",message);
      return { ...state, err: true , message:message};
    }

    case VERIFY_ACCOUNT_IS_LOADING: {
      return { ...state, isLoading: true, err:false };
    }

    case VERIFY_ACCOUNT_DATA: {
      return {
        ...state,
        isLoading: false,
        err:false,
        message:'succesfully verified account!'
      };
    }

    case VERIFY_ACCOUNT_ERROR: {
      return { ...state, err: true , message:'something went wrong'};
    }

    default:
      return state;
  }
}
