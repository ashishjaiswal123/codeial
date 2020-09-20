const express = require('express');
const { route } = require('..');

const router = express.Router();

router.use('/posts',require('./posts'));



module.exports = router;