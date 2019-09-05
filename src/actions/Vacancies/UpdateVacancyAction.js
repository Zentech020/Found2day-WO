import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const UPDATE_VACANCY_IS_LOADING = 'update_vacancy_is_loading';
export const UPDATE_VACANCY_DATA = 'update_vacancy_data';
export const UPDATE_VACANCY_ERROR = 'update_vacancy_error';

export const updateVacancy = (
  vacancyId,
  vacancy,
  newContent
) => async dispatch => {
  try {
    dispatch({ type: UPDATE_VACANCY_IS_LOADING });
    const result = await axios.put(
      `${API_URL}/vacancies/${vacancyId}`,
      {
        title: vacancy.title,
        description: vacancy.description,
        content:newContent,
        image: vacancy.image,
        jobTitle: vacancy.jobTitle,
        branch: vacancy.branch,
        education: vacancy.education,
        experience: vacancy.experience,
        employmentType: vacancy.employmentType,
        weekHours: vacancy.weekHours,
        postalcode: vacancy.postalcode,
        visible:vacancy.visible
      },
      header
    );
    return dispatch({ type: UPDATE_VACANCY_DATA, result });
  } catch (err) {
    return dispatch({
      type: UPDATE_VACANCY_ERROR,
      payload: err
    });
  }
};
