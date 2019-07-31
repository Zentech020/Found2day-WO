import {
  GET_SPECS_IS_LOADING,
  GET_SPECS_DATA,
  GET_SPECS_ERROR
} from '../../actions/Vacancies/GetSpecsAction';

const initialState = {
  specs: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SPECS_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case GET_SPECS_DATA: {
      const { data } = action.result;
      return { ...state, specs: data };
    }

    case GET_SPECS_ERROR: {
      return { ...state, payload: action.err };
    }

    default:
      return state;
  }
};
