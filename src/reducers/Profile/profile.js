import {
  INVITE_USER_IS_LOADING,
  INVITE_USER_DATA,
  INVITE_USER_ERROR
} from '../../actions/Profile/InviteUserAction';

import {
  GET_PROFILE_IS_LOADING,
  GET_PROFILE_DATA,
  GET_PROFILE_ERROR
} from '../../actions/Profile/GetProfileAction';

import {
  UPDATE_PROFILE_IS_LOADING,
  UPDATE_PROFILE_DATA,
  UPDATE_PROFILE_ERROR
} from '../../actions/Profile/UpdateProfileAction';

const initialState = {
  isLoading: true,
  success: false,
  err: false,
  message:'',
  busy:false,
  profile:[],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INVITE_USER_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case INVITE_USER_DATA: {
      return {
        ...state,
        isLoading: false,
        success: true,
        err:false,
        message: "Invitation Succeed",
      };
    }

    case INVITE_USER_ERROR: {
      return { ...state, err: true, message: "Invitation Failed", };
    }

    case GET_PROFILE_IS_LOADING: {
      return {...state , err:false, isLoading:true}
    }

    case GET_PROFILE_DATA: {
      return {...state , err:false, isLoading:false, profile:action.result.data}
    }

    case GET_PROFILE_ERROR: {
      return {...state , err:true, isLoading:false}
    }

    case UPDATE_PROFILE_IS_LOADING: {
      return {...state , err:false, isLoading:true}
    }

    case UPDATE_PROFILE_DATA: {
      return {...state , err:false, isLoading:false, profile:action.result.data, message: "Sucessfully updated profile"}
    }

    case UPDATE_PROFILE_ERROR: {
      return {...state , err:true, isLoading:false, message: "Failed updated profile"}
    }

    default:
      return state;
  }
};
