const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {jwtauthmiddleware} = require('../middlewares/auth.middleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', jwtauthmiddleware,userController.getProfile);
router.put('/profile/password', jwtauthmiddleware, userController.updatePassword);

module.exports = router;