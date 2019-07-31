import {
  UPDATE_VACANCY_IS_LOADING,
  UPDATE_VACANCY_DATA,
  UPDATE_VACANCY_ERROR
} from '../../actions/Vacancies/UpdateVacancyAction';

const initialState = {
  isLoading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VACANCY_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case UPDATE_VACANCY_DATA: {
      return { ...state, success: true };
    }

    case UPDATE_VACANCY_ERROR: {
      return { ...state, success: false };
    }

    default:
      return state;
  }
};
