const express = require('express');
const router = express.Router();

// importing controllers
const authControllers = require('../controllers/auth-controller');

//definition of routes
router.post('/sign-in', authControllers.signIn);
router.post('/sign-up', authControllers.signUp);

module.exports = router;
