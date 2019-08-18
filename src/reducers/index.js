import { combineReducers } from 'redux';
import home from './Home/Home';
import applicants from './Applicants/ApplicantsReducer';
import Specs from './Vacancies/GetSpecsReducer';
import Payment from './Billing/PaymentReducer';
import vacancies from './Vacancies/vacancies';
import auth from './Auth/auth';
import profile from './Profile/profile';
import group from './Group/group';
import UpcomingInvoice from './Billing/InvoiceReducer';

export default combineReducers({
  auth,
  home,
  vacancies,
  applicants,
  profile,
  Payment,
  Specs,
  group,
  UpcomingInvoice
});
