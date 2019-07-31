import {
  REGISTER_INVITE_IS_LOADING,
  REGISTER_INVITE_DATA,
  REGISTER_INVITE_ERROR
} from '../../actions/Auth/RegisterInviteAction';

const initialState = {
  err: '',
  auth: false,
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {

    case REGISTER_INVITE_IS_LOADING: {
      return { ...state, isLoading: true, auth: false };
    }

    case REGISTER_INVITE_DATA: {
      return {
        ...state,
        isLoading: false,
        auth: false,
        payload: action.result
      };
    }

    case REGISTER_INVITE_ERROR: {
      return { ...state, err: action.err };
    }

    default:
      return state;
  }
};
