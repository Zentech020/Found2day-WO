import {
  VACANCIES_BY_ACCOUNT_IS_LOADING,
  VACANCIES_BY_ACCOUNT_DATA,
  VACANCIES_BY_ACCOUNT_ERROR
} from '../../actions/Vacancies/GetVacanciesByAccountAction';

const initialState = {
  vacancies_by_account: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VACANCIES_BY_ACCOUNT_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case VACANCIES_BY_ACCOUNT_DATA: {
      const { data } = action.result;
      return { ...state, vacancies_by_account: data };
    }

    case VACANCIES_BY_ACCOUNT_ERROR: {
      return { ...state, payload: action.err };
    }

    default:
      return state;
  }
};
