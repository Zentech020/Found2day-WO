import {
  INVITE_USER_IS_LOADING,
  INVITE_USER_DATA,
  INVITE_USER_ERROR
} from '../../actions/Profile/InviteUserAction';

const initialState = {
  err: '',
  isLoading: true,
  success: false
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
        success: true
      };
    }

    case INVITE_USER_ERROR: {
      return { ...state, err: action.err };
    }

    default:
      return state;
  }
};
