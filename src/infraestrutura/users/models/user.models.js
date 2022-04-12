exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};