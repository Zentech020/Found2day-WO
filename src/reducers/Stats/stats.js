
import {
  GET_APPLICANTS_TIME_IS_LOADING,
  GET_APPLICANTS_TIME_DATA,
  GET_APPLICANTS_TIME_ERROR
} from '../../actions/Stats/GetApplicantsTime';
const initialState = {
  isLoading: true,
  success: false,
  err: false,
  message:'',
  busy:false,
  applicantsTime:[],
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
        applicantsTime: action.result.data.map( s => ({x:s.date, y:s.count}))

      };
    }

    case GET_APPLICANTS_TIME_ERROR: {
      return { ...state, err:true, isLoading:false };
    }


    default:
      return state;
  }
};
