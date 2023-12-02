const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');
//validating for blank signup or invalid login/signup credentails
const Validate  = require('../middleware/validate');
const checkAuth = require('../middleware/checkAuth');


router.post('/signup', userController.Login);


router.use(checkAuth);



module.exports = router;
