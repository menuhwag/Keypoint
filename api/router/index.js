const express = require('express');
const router = express.Router();
const items = require('./items');
const images = require('./images');

router.use('/items', items);
router.use('/images', images);

module.exports = router;