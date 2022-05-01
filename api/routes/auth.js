const express = require('express');
const router = express.Router();
const { authValidation } = require('../validations');
const validate = require('../middlewares/validate');
const { AuthController } = require('../controllers');

// api/auth/register
router.post('/register', validate(authValidation.register), AuthController.register);

// api/auth/login
router.post('/login', validate(authValidation.login), AuthController.login);

// api/auth/social-login
router.post('/social-login', AuthController.socialMediaLogin);

module.exports = router;