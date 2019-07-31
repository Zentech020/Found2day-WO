import { combineReducers } from 'redux';
import homeNotification from './Home/NotificationReducer';
import applicants from './Applicants/ApplicantsReducer';
import inviteUser from './Profile/InviteUserReducer';
import Specs from './Vacancies/GetSpecsReducer';
import Payment from './Finance/PaymentReducer';
import vacancies from './Vacancies/vacancies';
import auth from './Auth/auth';
import profile from './Profile/profile';

export default combineReducers({
  auth,
  homeNotification,
  vacancies,
  applicants,
  profile,
  Payment,
  Specs
});
