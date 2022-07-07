const User = require('../model/User');
const bcrypt = require('bcrypt');
const { uploadToCloudinary } = require('../utils/cloudinary');

const handleNewUser = async (req, res) => {
  const { user, email, pwd, picture } = req.body;

  if (!user || !email || !pwd) return res.status(400).json('Something is missing');

  const duplicateUser = await User.findOne({ username: user }).exec();
  if (duplicateUser) return res.sendStatus(409).json('Username taken'); // Conflict

  const duplicateEmail = await User.findOne({ email }).exec();
  if (duplicateEmail) return res.sendStatus(409).json('Email taken'); // Conflict

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const { url, public_id: publicId } = await uploadToCloudinary(picture);

    await User.create({
      username: user,
      email: email,
      picture: { url, publicId },
      password: hashedPwd,
    });

    res.status(201).json(`New user named ${user} was created!`);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { handleNewUser };
