const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tagsController');

router.route('/').get(tagsController.getTags);

router.route('/limit').get(tagsController.getNumTags);

router.route('/:name').get(tagsController.getTagByName);

module.exports = router;
