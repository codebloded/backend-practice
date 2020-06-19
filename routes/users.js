var express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();
const User = require('../models/user');
const { route } = require('.');
router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
