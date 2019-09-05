exports.isAdmin = (user_id, admins) => {
  if(admins.find(admin => (admin === user_id))) {
    return true
  }
  else {
    return false;
  }
}
