const { User } = require("../utils/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "secretkey23456";

// Fonction pour créer un utilisateur
exports.signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const { firstName, lastName, email, phoneNumber } = req.body;

    const user = {
      password: hashedPassword,
      firstName,
      role: "client", // Le rôle est défini par défaut comme "client"
      lastName,
      email,
      phoneNumber,
    };

    // Vérifiez si l'adresse e-mail est déjà utilisée
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) {
      // L'adresse e-mail existe déjà
      return res.status(400).json({ message: "Email already in use" });
    }

    await User.create(user);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fonction pour connecter un utilisateur
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user)
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });

    const payload = {
      email: req.body.email,
      id: user.id,
      role: user.role,
      // On peut ajouter d'autres propriétés ici
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fonction pour réinitialiser le mot de passe
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validation de base
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ error: "Email and new password are required" });
    }

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hachage du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    console.log("Salt generated successfully");
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log("Password hashed successfully");

    // Mise à jour du mot de passe dans la base de données
    console.log("Before saving:", user.password);
    user.password = hashedPassword;
    await user.save();
    console.log("After saving:", user.password);

    // Répondre avec un message de succès
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    // Gérer les erreurs qui pourraient survenir pendant le processus de réinitialisation
    console.error(error);
    res
      .status(500)
      .json({ error: "Error resetting password. Please try again later." });
  }
};
