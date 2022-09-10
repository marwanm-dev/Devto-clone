const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization; // ex: Bearer {token}
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized
  const accessToken = authHeader.split(' ')[1];
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    next();
  });
};

module.exports = verifyJWT;
