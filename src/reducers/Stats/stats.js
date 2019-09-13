
import {
  GET_APPLICANTS_TIME_IS_LOADING,
  GET_APPLICANTS_TIME_DATA,
  GET_APPLICANTS_TIME_ERROR,
  GET_VISIBLE_VACANCIES_IS_LOADING,
  GET_VISIBLE_VACANCIES_DATA,
  GET_VISIBLE_VACANCIES_ERROR
} from '../../actions/Stats/stats';

const initialState = {
  isLoading: true,
  success: false,
  err: false,
  message:'',
  busy:false,
  applicantsTime:[],
  dates:[],
  visible_vacancies:0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_APPLICANTS_TIME_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case GET_APPLICANTS_TIME_DATA: {
      return {
        ...state,
        isLoading: false,
        err:false,
        applicantsTime: action.result.data.result.map( s => ({x:s.date, y:s.count})),
        dates: action.result.data.result.map( s => (s.date))
      };
    }

    case GET_APPLICANTS_TIME_ERROR: {
      return { ...state, err:true, isLoading:false };
    }

    case GET_VISIBLE_VACANCIES_IS_LOADING: {
      return {...state, isLoading:true}
    }

    case GET_VISIBLE_VACANCIES_DATA: {
      console.log(action);
      return {...state, err:false, isLoading:false, visible_vacancies:action.result.data.count}
    }

    case GET_VISIBLE_VACANCIES_ERROR: {
      return{...state, isLoading:false, err:true}
    }





    default:
      return state;
  }
};
