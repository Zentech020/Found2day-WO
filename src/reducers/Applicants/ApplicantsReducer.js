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

import {
  GET_DEVIATION_IS_LOADING,
  GET_DEVIATION_DATA,
  GET_DEVIATION_ERROR
} from '../../actions/Applicants/getDeviatonsAction';

const initialState = {
  applications: [],
  isLoading: false,
  deviations:[],
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
      return {...state, applications:action.result.data.applications, err:false, isLoading:false}
    }

    case APPLICATIONS_BY_GROUP_ERROR : {
      return {...state,  err:true, isLoading:false}
    }

    case APPLICATIONS_BY_VACANCY_IS_LOADING : {
      return {...state, isLoading:true}
    }

    case APPLICATIONS_BY_VACANCY_DATA : {
      return {...state, applications:action.result.data.applications, err:false, isLoading:false}
    }

    case APPLICATIONS_BY_VACANCY_ERROR : {
      return {...state,  err:true, isLoading:false}
    }

    case GET_DEVIATION_IS_LOADING : {
      return {...state,deviatons:[] ,isLoading:true}
    }

    case GET_DEVIATION_DATA : {
      const applicants_specs = [action.applicantSpecs.data.specifications];
      const vacancy_specs = action.vacancySpecs.data.vacancy;
      var counter = 6;
      const deviations = {
          jobTitle: {isDeviated:applicants_specs[0].jobTitle.includes(vacancy_specs.jobTitle), title:vacancy_specs.jobTitle},
          branch: {isDeviated:applicants_specs[0].branch.includes(vacancy_specs.branch), title:vacancy_specs.branch},
          education: {isDeviated:applicants_specs[0].education.includes(vacancy_specs.education), title:vacancy_specs.education},
          experience: {isDeviated:applicants_specs[0].experience.includes(vacancy_specs.experience), title:vacancy_specs.experience},
          employmentType: {isDeviated:applicants_specs[0].employmentType.includes(vacancy_specs.employmentType), title:vacancy_specs.employmentType},
          weekHours: {isDeviated:applicants_specs[0].workingWeek.includes(vacancy_specs.weekHours), title:vacancy_specs.weekHours},
      }
      return {...state, deviations:deviations, match:counter ,err:false, isLoading:false}
    }

    case GET_DEVIATION_ERROR : {
      return {...state,  err:true, isLoading:false}
    }

    default:
      return state;
  }
};
