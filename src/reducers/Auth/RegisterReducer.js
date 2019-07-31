import {
  REGISTER_IS_LOADING,
  REGISTER_DATA,
  REGISTER_ERROR
} from '../../actions/Auth/RegisterAction';

const initialState = {
  err: '',
  auth: false,
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_IS_LOADING: {
      return { ...state, isLoading: true, auth: false };
    }

    case REGISTER_DATA: {
      return {
        ...state,
        isLoading: false,
        auth: false,
        payload: action.result
      };
    }

    case REGISTER_ERROR: {
      return { ...state, err: action.err };
    }

    default:
      return state;
  }
};
