const express = require("express");
const router = express.Router();
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "secretkey23456";

router.post("/signup", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const { firstName, role, lastName, email, phoneNumber } = req.body;

  const user = {
    password: hashedPassword,
    firstName,
    role: "client",
    lastName,
    email,
    phoneNumber,
  };

  // Vérifiez si l'adresse e-mail est déjà utilisée
  const existingUser = await User.findOne({
    where: { email: user.email },
  });
  if (existingUser) {
    // L'adresse e-mail existe déjà
    res.status(400);
    res.send({
      message: "email already in use",
    });
    return;
  }
  await User.create(user);
  res.json({ message: "utilisateur créé", user });
});

router.post("/signin", async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user)
    return res
      .status(400)
      .json({ message: `Nom d'utilisateur ou mot de passe incorrect` });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .json({ message: `Nom d'utilisateur ou mot de passe incorrect` });

  const payload = {
    email: req.body.email,
    id: user.id,
    role: user.role,
    // Vous pouvez ajouter d'autres propriétés ici
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: token });
});

// Route pour réinitialiser le mot de passe
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    //Validation de base
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ error: "Email et nouveau mot de passe sont requis" });
    }

    // Recherche de l'utilisateur par email
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Hachage du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    console.log("Salt generated successfully");
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log("Password hashed successfully");

    // Mise à jour du mot de passe dans la base de données
    console.log("Avant la sauvegarde :", user.password);
    user.password = hashedPassword;
    await user.save();
    console.log("Après la sauvegarde :", user.password);

    // Répondez avec un message de succès
    res.json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    // Gérez les erreurs qui pourraient survenir pendant le processus de réinitialisation
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la réinitialisation du mot de passe" });
  }
});

module.exports = router;
