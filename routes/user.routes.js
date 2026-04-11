const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {jwtauthmiddleware} = require('../middlewares/auth.middleware');
const {strictLimiter} = require('../middlewares/rateLimiter.middleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', jwtauthmiddleware,userController.getProfile);
router.put('/profile/password', jwtauthmiddleware,strictLimiter,userController.updatePassword);

module.exports = router;