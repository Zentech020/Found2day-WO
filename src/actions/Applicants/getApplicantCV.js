import axios from 'axios';

export const APPLICANT_CV_IS_LOADING = 'applicant_cv_is_loading';
export const APPLICANT_CV_DATA = 'applicant_cv_data';
export const APPLICANT_CV_ERROR = 'applicant_cv_error';

export const getApplicantCV = (applicantToken) => async dispatch => {
  try {
    dispatch({ type: APPLICANT_CV_IS_LOADING });
    const result = await axios.get(`https://api.found2day.nl/api/v1/applicant/cv?apikey=${applicantToken}`, {
      responseType: 'blob'
    });
    return dispatch({ type: APPLICANT_CV_DATA, result });
  } catch (err) {
    return dispatch({type:APPLICANT_CV_ERROR, payload:err})
  }
};
