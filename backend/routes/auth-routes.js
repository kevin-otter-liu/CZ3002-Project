const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
// importing controllers
const authControllers = require('../controllers/auth-controller');

//definition of routes
router.post('/sign-in', authControllers.signIn);
router.post('/sign-up', authControllers.signUp);
router.delete('/', [checkAuth], authControllers.deleteUser);

module.exports = router;
