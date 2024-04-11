const express = require('express');
const router = express.Router();
const { signUpValidationRules, signInValidationRules } = require('../middlewares/authValidationRules');
const authController = require('../controllers/authController');

// Sign-up (Inscription)
router.post('/signup', signUpValidationRules(), async (req, res) => {
    authController.signUp(req, res);
});

// Sign-in (Connexion)
router.post('/signin', signInValidationRules(), async (req, res) => {
    authController.signIn(req, res);
});

module.exports = router;
