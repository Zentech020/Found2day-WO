import {
  HOME_NOTIFICATION_IS_LOADING,
  HOME_DATA_NOTIFICATION,
  HOME_DATA_NOTIFICATION_ERROR
} from '../../actions/Home/NotificationAction';

import {
  APPLICATIONS_COUNT_IS_LOADING,
  APPLICATIONS_COUNT_DATA,
  APPLICATIONS_COUNT_ERROR
} from '../../actions/Home/getApplicationCount';

import {
  VACANCIES_COUNT_IS_LOADING,
  VACANCIES_COUNT_DATA,
  VACANCIES_COUNT_ERROR
} from '../../actions/Home/getVacancyCount';


const initialState = {
  vacancy_count:0,
  application_count:0,
  notification: '',
  isLoading: false,
  err:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_NOTIFICATION_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case HOME_DATA_NOTIFICATION: {
      const { Message } = action.result.data.records[0].fields;
      return { ...state, notification: Message };
    }

    case HOME_DATA_NOTIFICATION_ERROR: {
      return { ...state, err:true };
    }

    case APPLICATIONS_COUNT_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case APPLICATIONS_COUNT_DATA: {
      const {count} = action.result.data;
      return { ...state, err: false, isLoading:false, application_count:count };
    }

    case APPLICATIONS_COUNT_ERROR: {
      return { ...state, err:true ,isLoading:false};
    }

    case VACANCIES_COUNT_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case VACANCIES_COUNT_DATA: {
      const {count} = action.result.data;
      return { ...state, err: false, isLoading:false, vacancy_count:count };
    }

    case VACANCIES_COUNT_ERROR: {
      return { ...state, err:true ,isLoading:false};
    }

    default:
      return state;
  }
};
