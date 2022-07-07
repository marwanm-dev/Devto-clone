const User = require('../model/User');
const cloudinary = require('../config/cloudinary');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) res.sendStatus(204).json({ message: 'No Users Found' });

  res.json(users);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.sendStatus(400).json({ message: 'User Id required' });

  const user = User.find({ _id: id }).exec();
  if (!user) return res.sendStatus(204).json({ message: `User ID ${id} not found` });

  const result = await User.deleteOne({ _id: id }).exec();

  res.json(result);
};

const getUser = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.sendStatus(400).json({ message: 'User Id required' });

  const user = await User.findOne({ _id: id }).exec();
  if (!user) return res.sendStatus(204).json({ message: `User ID ${id} not found` });

  res.json(user);
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.sendStatus(400).json({ message: 'User Id required' });

  const user = await User.findOne({ _id: id }).exec();
  if (!user) return res.sendStatus(204).json({ message: `User ID ${id} not found` });

  const picturePublicId = req.body.picture.publicId;

  cloudinary.uploader.destroy(picturePublicId);

  const { url, public_id: publicId } = await uploadToCloudinary(req.body.picture.url);

  req.body.picture = { url, publicId };

  const result = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
  res.json(result);
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
};
