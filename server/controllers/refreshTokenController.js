const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) res.sendStatus(403); // Forbidden

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser?.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: foundUser?.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1m',
      }
    );

    res.json(accessToken);
  });
};

module.exports = { handleRefreshToken };
