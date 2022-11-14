const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const limiter = require("../middleware/limiter")

router.post('/signup', limiter.limiter, userCtrl.signup);
router.post('/login', limiter.limiter, userCtrl.login);


module.exports = router;