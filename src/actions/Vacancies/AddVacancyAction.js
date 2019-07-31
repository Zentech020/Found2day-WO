import axios from 'axios';

export const ADD_VACANCIE_IS_LOADING = 'add_vacancie_is_loading';
export const ADD_VACANCIE_DATA = 'add_vacancie_data';
export const ADD_VACANCIES_ERROR = 'add_vacancie_data';

if (sessionStorage.getItem('jwtToken')) {
  var config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken'),
     }
  };
} else {
  var config = '';
}

export const addVacancyAction = (
  title,
  description,
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
    dispatch({ type: ADD_VACANCIE_IS_LOADING });
    const result = await axios.post(

      `http://127.0.0.1:5000/vacancies`,
      {
        title: title,
        description: description,
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
      config
    );
    return dispatch({ type: ADD_VACANCIE_DATA, result });
  } catch (err) {
    return dispatch({
      type: ADD_VACANCIES_ERROR,
      payload: err
    });
  }
};
