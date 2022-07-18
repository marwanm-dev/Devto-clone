const User = require('../model/User');
const bcrypt = require('bcrypt');
const { uploadToCloudinary } = require('../utils/cloudinary');

const handleNewUser = async (req, res) => {
  const { name, user, email, pwd, picture } = req.body;
  let url, publicId;

  if (!name || !user || !email || !pwd) return res.status(400).json('Something is missing');

  if (!picture) {
    url = process.env.CLOUDINARY_DEFAULT_URL;
    publicId = process.env.CLOUDINARY_DEFAULT_PUBLIC_ID;
  }

  const duplicateUser = await User.findOne({ username: user }).exec();
  if (duplicateUser) return res.sendStatus(409).json('Username taken'); // Conflict

  const duplicateEmail = await User.findOne({ email }).exec();
  if (duplicateEmail) return res.sendStatus(409).json('Email taken'); // Conflict

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    if (picture) {
      const uploadedResponse = await uploadToCloudinary(picture, 'Profiles');
      url = uploadedResponse.url;
      publicId = uploadedResponse.public_id;
    }

    await User.create({
      name,
      username: user,
      email,
      picture: {
        url,
        publicId,
      },
      password: hashedPwd,
    });

    res.status(201).json(`New user named ${user} was created!`);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { handleNewUser };
