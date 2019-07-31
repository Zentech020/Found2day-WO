import axios from 'axios';

export const HOME_NOTIFICATION_IS_LOADING = 'home_notification_is_loading';
export const HOME_DATA_NOTIFICATION = 'home_data_notification';
export const HOME_DATA_NOTIFICATION_ERROR = 'home_data_notification_error';

var config = {
  headers: { Authorization: 'Bearer keyc1rvSQz8HDN9rU' }
};

export const getHomeNotification = pars => async dispatch => {
  try {
    dispatch({ type: HOME_NOTIFICATION_IS_LOADING });
    const result = await axios.get(
      `https://api.airtable.com/v0/appBtsrpZag3oEavg/Notifications?maxRecords=3&view=Grid%20view`,
      config
    );
    console.log(result);
    return dispatch({ type: HOME_DATA_NOTIFICATION, result });
  } catch (err) {
    console.log(err, 'from notifications actions');
    return dispatch({
      type: HOME_DATA_NOTIFICATION_ERROR,
      payload: err
    });
  }
};
