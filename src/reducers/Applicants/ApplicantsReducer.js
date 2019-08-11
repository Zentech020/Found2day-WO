import {
  APPLICANTS_IS_LOADING,
  APPLICANTS_DATA,
  APPLICANTS_ERROR
} from '../../actions/Applicants/getApplicantsAction';

import {
  APPLICATIONS_BY_GROUP_IS_LOADING,
  APPLICATIONS_BY_GROUP_DATA,
  APPLICATIONS_BY_GROUP_ERROR
} from '../../actions/Applicants/GetApplicationsByGroup';

import {
  APPLICATIONS_BY_VACANCY_IS_LOADING,
  APPLICATIONS_BY_VACANCY_DATA,
  APPLICATIONS_BY_VACANCY_ERROR
} from '../../actions/Applicants/GetApplicationsByVacancy';

const initialState = {
  applications: [],
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

    case APPLICATIONS_BY_GROUP_IS_LOADING : {
      return {...state, isLoading:true}
    }

    case APPLICATIONS_BY_GROUP_DATA : {
      return {...state, applications:action.result.data, err:false, isLoading:false}
    }

    case APPLICATIONS_BY_GROUP_ERROR : {
      return {...state,  err:true, isLoading:false}
    }

    case APPLICATIONS_BY_VACANCY_IS_LOADING : {
      return {...state, isLoading:true}
    }

    case APPLICATIONS_BY_VACANCY_DATA : {
      return {...state, applications:action.result.data, err:false, isLoading:false}
    }

    case APPLICATIONS_BY_VACANCY_ERROR : {
      return {...state,  err:true, isLoading:false}
    }

    default:
      return state;
  }
};
