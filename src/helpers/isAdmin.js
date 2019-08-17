exports.isAdmin = (user_id) => {
  const admins = JSON.parse(sessionStorage.getItem('group')).admins;
  if(admins.find(admin => (admin === user_id))) {
    return true
  }
  else {
    return false;
  }
}
