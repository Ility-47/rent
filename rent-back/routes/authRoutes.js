const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const AuthController = require('../controllers/authController');

router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('username').not().isEmpty().trim()
  ],
  AuthController.register
);

router.post('/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  AuthController.login
);

module.exports = router;