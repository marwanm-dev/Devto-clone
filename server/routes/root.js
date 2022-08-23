const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Dev.to clone server is running by marodevv'));

module.exports = router;
