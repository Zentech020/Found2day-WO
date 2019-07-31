import {
  VACANCIES_BY_GROUP_IS_LOADING,
  VACANCIES_BY_GROUP_DATA,
  VACANCIES_BY_GROUP_ERROR
} from '../../actions/Vacancies/GetVacanciesByGroupAction';

const initialState = {
  vacancies_by_group: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VACANCIES_BY_GROUP_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case VACANCIES_BY_GROUP_DATA: {
      const { data } = action.result;
      return { ...state, vacancies_by_group: data };
    }

    case VACANCIES_BY_GROUP_ERROR: {
      return { ...state, payload: action.err };
    }

    default:
      return state;
  }
};
