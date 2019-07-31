import {
  APPLICANTS_IS_LOADING,
  APPLICANTS_DATA,
  APPLICANTS_ERROR
} from '../../actions/Applicants/getApplicantsAction';

const initialState = {
  applicants: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APPLICANTS_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case APPLICANTS_DATA: {
      const { data } = action.result;
      return { ...state, applicants: data };
    }

    case APPLICANTS_ERROR: {
      return { ...state, payload: action.err };
    }

    default:
      return state;
  }
};
