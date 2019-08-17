exports.bearer = () => {
  if (sessionStorage.getItem('jwtToken')) {
    return  {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken'),
       }
    };
  } else {
    return '';
  }
}
