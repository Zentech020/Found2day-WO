import axios from 'axios';
import { API_URL } from '../../constants/url';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const ADD_VACANCIE_IS_LOADING = 'add_vacancie_is_loading';
export const ADD_VACANCIE_DATA = 'add_vacancie_data';
export const ADD_VACANCIES_ERROR = 'add_vacancie_error';

export const addVacancyAction = (vacancy, author, groupId, content, location, icon) => async dispatch => {
  try {
    dispatch({ type: ADD_VACANCIE_IS_LOADING  });
    const result = await axios.post(`${API_URL}/vacancies`,
      {
        title: vacancy.title,
        description: vacancy.description,
        content: content,
        maxApplicants:vacancy.maxApplicants,
        image: vacancy.image,
        jobTitle: vacancy.jobTitle,
        branch: vacancy.branch,
        education: vacancy.education,
        employmentType: vacancy.employmentType,
        experience: vacancy.experience,
        weekHours: vacancy.weekHours,
        distance: vacancy.distance,
        postalcode: vacancy.postalCode,
        icon: icon,
        groupId: groupId,
        author: author,
        location:location
      },
      header
    );
    return dispatch({ type: ADD_VACANCIE_DATA, result, message: "Submitting vacancy succeed" });
  } catch (err) {
    return dispatch({
      type: ADD_VACANCIES_ERROR,
      message: "Submitting vacancy failed",
    });
  }
};
