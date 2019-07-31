import {
  HOME_NOTIFICATION_IS_LOADING,
  HOME_DATA_NOTIFICATION,
  HOME_DATA_NOTIFICATION_ERROR
} from '../../actions/Home/NotificationAction';

const initialState = {
  notification: '',
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_NOTIFICATION_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    case HOME_DATA_NOTIFICATION: {
      const { Message } = action.result.data.records[0].fields;
      console.log(Message);
      return { ...state, notification: Message };
    }

    case HOME_DATA_NOTIFICATION_ERROR: {
      const { data } = action.res;
      return { ...state, profile: data };
    }

    default:
      return state;
  }
};
