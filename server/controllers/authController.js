const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(
  '696107882857-aohdavkpvfllchnd8folvqom8lar11rc.apps.googleusercontent.com'
);
const axios = require('axios');

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) return res.status('Something is missing');

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const accessToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '30s',
      }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '10m',
      }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.json({
      id: foundUser._id,
      name: foundUser.name,
      picture: foundUser.picture,
      bio: foundUser.bio,
      location: foundUser.location,
      education: foundUser.education,
      work: foundUser.work,
      availableFor: foundUser.availableFor,
      skills: foundUser.skills,
      token: accessToken,
      createdAt: foundUser.createdAt,
    });
  } else {
    res.status(401);
  }
};

const handleGoogleLogin = async (req, res) => {
  const { tokenId } = req.body;
  const response = await client.verifyIdToken({
    idToken: tokenId,
    audience: '696107882857-aohdavkpvfllchnd8folvqom8lar11rc.apps.googleusercontent.com',
  });
  const { name, email, picture, email_verified } = response.getPayload();
  let existingUser;
  let user;
  let emailVerified;

  if (email_verified) {
    try {
      emailVerified = true;

      existingUser = await User.findOne({ email }, '-password');
      user = existingUser;
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  if (!existingUser) {
    emailVerified = false;
    let hashedPwd;

    try {
      hashedPwd = await bcrypt.hash(email + email.slice(0, email.indexOf('@')) + email, 10);
    } catch (err) {
      return res.status(500).json(err.message);
    }

    user = await User.create({
      username: email.slice(0, email.indexOf('@')),
      name,
      email,
      password: hashedPwd,
      picture: {
        url: picture,
      },
    });

    try {
      await user.save();
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  let accessToken;
  try {
    accessToken = jwt.sign(
      {
        username: user.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '30s',
      }
    );
    const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '10m',
    });
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    user.refreshToken = refreshToken;
    await user.save();
  } catch (err) {
    return res.status(401);
  }

  res.json({
    id: user._id,
    name: user.name,
    email,
    picture: user.picture,
    bio: user.bio,
    location: user.location,
    education: user.education,
    work: user.work,
    availableFor: user.availableFor,
    skills: user.skills,
    token: accessToken,
    createdAt: user.createdAt,
  });
};
const handleGithubLogin = async (req, res) => {
  const { code } = req.body;

  const response = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=1126cea81f0703d86f79&client_secret=a7273b154baa53d11a9f6d86ad8172ea8a08f5d2&code=${code}`,
    headers: {
      accept: 'application/json',
    },
  });
  const { access_token } = response.data;
  const { data } = await axios({
    url: `https://api.github.com/user`,
    headers: {
      Authorization: `token ${access_token}`,
    },
  });

  const { name, avatar_url } = data;
  let email;
  if (data.email) email = data.email;
  if (!data.email) {
    const res = await axios({
      url: `'https://api.github.com/user/emails`,
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    const emails = await res.json();
    if (!emails || emails.length === 0) {
      return;
    }
    const sortedEmails = emails.sort((a, b) => b.primary - a.primary);
    email = sortedEmails[0].email;
  }

  let existingUser;
  let user;

  try {
    existingUser = await User.findOne({ email }, '-password');
    user = existingUser;
  } catch (err) {
    return res.status(500);
  }

  if (!existingUser) {
    let hashedPwd;
    try {
      hashedPwd = await bcrypt.hash(email + name + email, 10);
    } catch (err) {
      return res.status(500);
    }
    user = new User({
      username: email.slice(0, email.indexOf('@')),
      name,
      email,
      password: hashedPwd,
      picture: {
        url: avatar_url,
      },
    });
    try {
      user.refreshToken = refreshToken;
      await user.save();
    } catch (err) {
      return res.status(500);
    }
  }

  token = jwt.sign(
    {
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '30s',
    }
  );

  const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '10m',
  });
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000,
  });

  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    id: user._id,
    name: user.name,
    email,
    picture: user.picture,
    bio: user.bio,
    location: user.location,
    education: user.education,
    work: user.work,
    availableFor: user.availableFor,
    skills: user.skills,
    token,
    createdAt: user.createdAt,
  });
};

module.exports = { handleLogin, handleGoogleLogin, handleGithubLogin };
