const User = require('../model/User');
const Post = require('../model/Post');
const Comment = require('../model/Comment');
const cloudinary = require('../config/cloudinary');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { deletePostsByUserId } = require('./postsController');

const getUser = async (req, res) => {
  const username = req.params.username;
  if (!username) return res.status(400).json({ message: 'User name required' });

  const user = await User.findOne({ username });

  if (!user) return res.status(204).json({ message: `User ${username} not found` });

  res.json(user);
};

const getUserDashboard = async (req, res) => {
  const username = req.params.username;
  if (!username) return res.status(400).json({ message: 'User name required' });

  const user = await User.findOne({ username })
    .populate({ path: 'posts', options: { sort: { createdAt: -1 } } })
    .populate('following')
    .populate('followers')
    .populate({ path: 'followedTags', options: { sort: { followers: -1 } } });

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

  ['followers', 'following'].forEach(k => {
    (async () => {
      await User.updateMany({ [k]: id }, { $pull: { [k]: id } });
    })();
  });

  await deletePostsByUserId(user);

  const deletedUser = await User.deleteOne({ _id: id }).exec();

  res.json(deletedUser);
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
  res.json(updatedUser);
};

const handleFollow = async (req, res) => {
  const { previewedId, action } = req.params;
  const { currentId } = req.body;
  const isUndoing = action.includes('un');

  await User.findOneAndUpdate(
    { _id: currentId },
    { [isUndoing ? '$pull' : '$addToSet']: { following: previewedId } },
    { timestamps: false }
  );

  const followedUser = await User.findOneAndUpdate(
    { _id: previewedId },
    { [isUndoing ? '$pull' : '$addToSet']: { followers: currentId } },
    { new: true, timestamps: false }
  );

  res.json(followedUser);
};

module.exports = {
  getUser,
  getUserDashboard,
  deleteUser,
  updateUser,
  handleFollow,
};
