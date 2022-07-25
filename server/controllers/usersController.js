const User = require('../model/User');
const cloudinary = require('../config/cloudinary');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getUser = async (req, res) => {
  const username = req.params.username;
  if (!username) return res.status(400).json({ message: 'User name required' });

  const user = await User.findOne({ username }).exec();
  if (!user) return res.status(204).json({ message: `User ${username} not found` });

  res.json(user);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'User Id required' });

  const user = await User.findOne({ _id: id }).exec();
  if (!user) return res.status(204).json({ message: `User ID ${id} not found` });

  if (user.picture.publicId !== process.env.CLOUDINARY_DEFAULT_PUBLIC_ID)
    cloudinary.uploader.destroy(user.picture.publicId);

  const deletedUser = await User.deleteOne({ _id: id }).exec();
  res.status(200).json(deletedUser);
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id }).exec();
  if (!user) return res.status(204).json({ message: `User ID ${id} not found` });

  const { url, public_id: publicId } = await uploadToCloudinary(req.body.picture.url, 'Profiles');

  if (user.picture.publicId !== process.env.CLOUDINARY_DEFAULT_PUBLIC_ID)
    cloudinary.uploader.destroy(user.picture.publicId);

  req.body.picture = { url, publicId };

  const updatedUser = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
  res.status(200).json(updatedUser);
};

module.exports = {
  getUser,
  deleteUser,
  updateUser,
};
