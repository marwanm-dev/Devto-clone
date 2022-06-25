const User = require('../model/User');

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) res.sendStatus(204).json({ message: 'No Users Found' });

  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req.body.id) return res.sendStatus(400).json({ message: 'User Id required' });

  const user = User.find({ _id: req.body.id }).exec();
  if (!user) return res.sendStatus(204).json({ message: `User ID ${req.body.id} not found` });

  const result = await User.deleteOne({ _id: req.body.id }).exec();
  console.log(result);

  res.json(result);
};

const getUser = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400).json({ message: 'User Id required' });

  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.sendStatus(204).json({ message: `User ID ${req.params.id} not found` });

  res.json(user);
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
};
