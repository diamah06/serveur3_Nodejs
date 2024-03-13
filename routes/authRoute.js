const express = require("express");
const router = express.Router();
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "secretkey23456";
const authController = require('../controllers/authController');

router.post("/signup", authController.signup);

router.post("/signin", authController.signin);

// Route pour réinitialiser le mot de passe
router.post("/reset-password", authController.resetPassword);

module.exports = router;

