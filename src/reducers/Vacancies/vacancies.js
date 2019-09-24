import {
  ADD_VACANCIE_IS_LOADING,
  ADD_VACANCIE_DATA,
  ADD_VACANCIES_ERROR
} from '../../actions/Vacancies/AddVacancyAction';

import {
  DELETE_VACANCY_IS_LOADING,
  DELETE_VACANCY_DATA,
  DELETE_VACANCY_ERROR
} from '../../actions/Vacancies/DeleteSingleVacancyAction';

import {
  VACANCIES_BY_ACCOUNT_IS_LOADING,
  VACANCIES_BY_ACCOUNT_DATA,
  VACANCIES_BY_ACCOUNT_ERROR
} from '../../actions/Vacancies/GetVacanciesByAccountAction';


import {
  VACANCIES_BY_GROUP_IS_LOADING,
  VACANCIES_BY_GROUP_DATA,
  VACANCIES_BY_GROUP_ERROR
} from '../../actions/Vacancies/GetVacanciesByGroupAction';

import {
  SINGLE_VACANCY_IS_LOADING,
  SINGLE_VACANCY_DATA,
  SINGLE_VACANCY_ERROR
} from '../../actions/Vacancies/GetSingleVacancyAction';

import {
  UPDATE_VACANCY_IS_LOADING,
  UPDATE_VACANCY_DATA,
  UPDATE_VACANCY_ERROR
} from '../../actions/Vacancies/UpdateVacancyAction';

import {
  GET_COORDINATES_LOADING,
  GET_COORDINATES_DATA,
  GET_COORDINATES_ERROR
} from '../../actions/Vacancies/getCoordinatesAction';

const initialState = {
  vacancies_by_account: [],
  vacancies_by_group:[],
  single_vacancy:[],
  isLoading: false,
  err:false,
  message:'',
  busy:false,
  location:[],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_VACANCIE_IS_LOADING: {
      return { ...state, isLoading: true, err:action.error};
    }

    case ADD_VACANCIE_DATA: {
      const {vacancy, msg} = action.result.data;
      return {  ...state, isLoading: false, vacancies_by_group: state.vacancies_by_group.concat(vacancy) , message:msg, err:false,};
    }

    case ADD_VACANCIES_ERROR: {
      const {msg} = action.payload.response.data
      console.log(action);
      return { ...state, err: true, isLoading:false ,message:msg };
    }

    case VACANCIES_BY_GROUP_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case VACANCIES_BY_GROUP_DATA: {
      const { vacancies } = action.result.data;
      return { ...state, vacancies_by_group: vacancies, isLoading: false };
    }

    case VACANCIES_BY_GROUP_ERROR: {
      return { ...state, error: action.err , isLoading: false};
    }

    case VACANCIES_BY_ACCOUNT_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case VACANCIES_BY_ACCOUNT_DATA: {
      const { vacancies } = action.result.data;
      return { ...state, vacancies_by_account: vacancies, isLoading: false };
    }

    case VACANCIES_BY_ACCOUNT_ERROR: {
      return { ...state, error: action.err, isLoading: false };
    }

    case DELETE_VACANCY_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case DELETE_VACANCY_DATA: {
      return {
        ...state, ...state.vacancies_by_group.filter((data, i) => data._id !== action.id),
        isLoading: false, err:false, message:'succesfully deleted vacancy' };
    }

    case DELETE_VACANCY_ERROR: {
      return { ...state, error: true, isLoading: false, message:'Something went wrong , try again!' };
    }


    case SINGLE_VACANCY_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case SINGLE_VACANCY_DATA: {
      const {vacancy} = action.result.data;
      return { ...state, isLoading:false, single_vacancy: vacancy };
    }

    case SINGLE_VACANCY_ERROR: {
      return { ...state, error: action.err };
    }

    case UPDATE_VACANCY_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case UPDATE_VACANCY_DATA: {
      const {msg} = action.result.data;
      return { ...state, isLoading:false, err:false, message:msg };
    }

    case UPDATE_VACANCY_ERROR: {
      return { ...state, isLoading:false, err: true, message:'Something went wrong , try again!' };
    }

    case GET_COORDINATES_LOADING: {
      return { ...state, isLoading: true };
    }

    case GET_COORDINATES_DATA: {
      console.log(action.result.data);
      return { ...state, err:false, location:action.result.data};
    }

    case GET_COORDINATES_ERROR: {
      return { ...state, err: true, message:'Something went wrong , try again!' };
    }

    default:
      return state;
  }
};
