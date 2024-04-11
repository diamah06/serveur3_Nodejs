const bcrypt = require("bcrypt");
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secretkey23456';

class AuthController {
    async signUp(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = {
                email: req.body.email,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: "user" // By default, the role is "user. Admin can change it later
            };

            await User.create(user);

            res.status(201).json('Utilisateur créé');
        } catch (error) {
            console.error(error);
            res.status(500).send("Erreur de serveur");
        }
    }

    async signIn(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send("Nom d'utilisateur ou mot de passe incorrect");
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).send("Nom d'utilisateur ou mot de passe incorrect");
            }

            // Generate JWT token
            const payload = {
                id: user._id, // You may include additional data here
                username: user.username,
                // Add more properties if needed
            };
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

            // Send token as response
            res.json({ auth: true, token });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erreur de serveur");
        }
    }
}

module.exports = new AuthController();
