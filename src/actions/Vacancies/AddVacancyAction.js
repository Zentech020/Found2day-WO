import axios from 'axios';
import {bearer} from '../../helpers/Bearer';
const header = bearer();
export const ADD_VACANCIE_IS_LOADING = 'add_vacancie_is_loading';
export const ADD_VACANCIE_DATA = 'add_vacancie_data';
export const ADD_VACANCIES_ERROR = 'add_vacancie_error';

export const addVacancyAction = (
  title,
  description,
  content,
  image,
  jobTitle,
  branch,
  education,
  employmentType,
  experience,
  weekHours,
  distance,
  postalCode,
  author,
  groupId
) => async dispatch => {
  try {
    dispatch({ type: ADD_VACANCIE_IS_LOADING  });
    const result = await axios.post(
      `http://127.0.0.1:5000/vacancies`,
      {
        title: title,
        description: description,
        content:content,
        image: image,
        jobTitle: jobTitle,
        branch: branch,
        education: education,
        employmentType: employmentType,
        experience: experience,
        weekHours: weekHours,
        distance: distance,
        postalcode: postalCode,
        icon: 'icon',
        groupId: groupId,
        author: author
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
