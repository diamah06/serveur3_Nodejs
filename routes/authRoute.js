
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {signUpValidationRules, signInValidationRules} = require('../middlewares/authValidationRules');
const { validationResult } = require('express-validator');
const authController = require('../controllers/authController');

const SECRET_KEY = 'secretkey23456';

// Simuler une base de données
const users = [];

// Sign-up (Inscription)
router.post('/signup', signUpValidationRules(), async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    authController.signUp(req, res);
});

// Sign-in (Connexion)
router.post('/signin', async (req, res) => {
  const user = users.find(u => u.username === req.body.username);
  if (!user) return res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');

  const payload = {
    username: user.username,
    // Vous pouvez ajouter d'autres propriétés ici
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  res.json({message: token});
});

// auth
router.get('/auth', (req, res) => {
  const payload = {
    username: user.username,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 60 * 60 * 24 });
  res.json({ auth: true, token });
});

// Route pour réinitialiser le mot de passe
router.post("/reset-password", authController.resetPassword);

module.exports = router;