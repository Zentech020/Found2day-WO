import {
  DELETE_VACANCY_IS_LOADING,
  DELETE_VACANCY_DATA,
  DELETE_VACANCY_ERROR
} from '../../actions/Vacancies/DeleteSingleVacancyAction';

const initialState = {
  isLoading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_VACANCY_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case DELETE_VACANCY_DATA: {
      return { ...state, success: true };
    }

    case DELETE_VACANCY_ERROR: {
      return { ...state, success: false };
    }

    default:
      return state;
  }
};
