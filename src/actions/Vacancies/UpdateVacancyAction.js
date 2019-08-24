import axios from 'axios';
import { toast } from "react-toastify";
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const UPDATE_VACANCY_IS_LOADING = 'update_vacancy_is_loading';
export const UPDATE_VACANCY_DATA = 'update_vacancy_data';
export const UPDATE_VACANCY_ERROR = 'update_vacancy_error';

export const updateVacancy = (
  vacancyId,
  vacancy
) => async dispatch => {
  try {
    dispatch({ type: UPDATE_VACANCY_IS_LOADING });
    const result = await axios.put(
      `http://127.0.0.1:5000/vacancies/${vacancyId}`,
      {
        title: vacancy.title,
        description: vacancy.description,
        content:"<p>contentcontent</p>",
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
