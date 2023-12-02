const express = require('express');
const router = express.Router();
const UniversityController = require('../controller/university-controller');

const checkAuth = require('../middleware/checkAuth');

router.post('/findByName', UniversityController.getUniversitiesByKeyword);







module.exports = router;
