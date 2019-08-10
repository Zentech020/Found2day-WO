import axios from 'axios';

export const APPLICATIONS_BY_VACANCY_IS_LOADING = 'applicantions_by_vacancy_is_loading';
export const APPLICATIONS_BY_VACANCY_DATA = 'applicantions_by_vacancy_data';
export const APPLICATIONS_BY_VACANCY_ERROR = 'applicantions_by_vacancy_error';

export const getApplicationsByVacancy = (vacancyId) => async dispatch => {
  try {
    dispatch({ type: APPLICATIONS_BY_VACANCY_IS_LOADING });
    const result = await axios.get(
      `http://127.0.0.1:5000/applications/vacancies/${vacancyId}`
    );
    return dispatch({ type: APPLICATIONS_BY_VACANCY_DATA, result, err:false });
  } catch (err) {
    return dispatch({type:APPLICATIONS_BY_VACANCY_ERROR, err:true, payload:err})
  }
};
