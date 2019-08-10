import {
  SINGLE_VACANCY_IS_LOADING,
  SINGLE_VACANCY_DATA,
  SINGLE_VACANCY_ERROR
} from '../../actions/Vacancies/GetSingleVacancyAction';

const initialState = {
  single_vacancy: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_VACANCY_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case SINGLE_VACANCY_DATA: {
      const { data } = action.result;
      return { ...state,  isLoading:false ,single_vacancy: data };
    }

    case SINGLE_VACANCY_ERROR: {
      return { ...state, payload: action.err };
    }

    default:
      return state;
  }
};
