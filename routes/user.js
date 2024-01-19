const express = require("express");
const router = express.Router();
const { isAdmin } = require("./isAdmin.js");

const { User } = require("../db.js");

//pouvez réutiliser ce middleware sur plusieurs routes qui nécessitent des droits d'administration.

// // Middleware to check if user is admin
// const isAdmin = (req, res, next) => {
//   console.log("User:", req.user);
//   if (req.user && req.user.role === "admin") {
//     next(); // user is admin, allow access
//   } else {
//     res.status(403).json({
//       message:
//         "Access denied. Only administrators have access to these resources.",
//     });
//   }
// };

/* GET all utilisateurs (accessible uniquement aux admin) */
router.get("/admin", isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

// Route for updating user's role, accessible by the admin
router.put("/isAdmin/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: `User with id:${id} not found` });
    }

    // Update the user's role
    user.role = role;

    await user.save();

    res.json({ message: "User's role updated successfully" });
  } catch (error) {
    next(error);
  }
});

/* GET role admin uniquement pour admin*/
router.get("/roleAdmin", isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        role: "admin",
      },
    });
    res.json({ users });
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      res.status(401).json({
        error: "Vous n'êtes pas autorisé à accéder à cette ressource.",
      });
    } else {
      next(error);
    }
  }
});

/* GET */
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

/* GET currentuser */
router.get("/currentUser", async (req, res, next) => {
  try {
    // Get the user ID
    const userId = req.user.id;

    // Find the user by ID
    const currentUser = await User.findByPk(userId);

    // If the user is not found, send a 404 error
    if (!currentUser) {
      return res.status(404).json({ error: "user not found" });
    }

    // Return the user information
    res.status(200).json({ currentUser });
  } catch (error) {
    // If there is an error, send the error message to the client
    next(error);
  }
});

// Route for updating user details, accessible by the authenticated user
router.put("/edit", async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;

    let user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: `User with id:${id} not found` });
    }

    // Update the user attributes
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.json({ message: "User profile updated" });
  } catch (error) {
    next(error);
  }
});

/* Post User */
router.post("/", isAdmin, async (req, res, next) => {
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    // If an existing user is found, respond with an error
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user with data from the request body
    const user = await User.create(req.body);

    res.json({ message: user });
  } catch (error) {
    // Handle any errors that occur during user creation
    next(error);
  }
});


/* PUT */
router.put("/:userId", async (req, res, next) => {
  try {
    // Get the user ID from the URL
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data with the information provided in the request body
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user.password = hashedPassword;
    }

    await user.save();

    res.json({ message: "User updated", user });
  } catch (error) {
    // Handle any error that occurs using the update route
    next(error);
  }
});

// /* DELETE */
// router.delete('/', async function (req, res, next)  {
//   const id = 1;
//   const user = await User.findByPk(id);
//   await user.destroy();
//   res.json({user });
// });

/* DELETE */
router.delete("/:userId", async (req, res, next) => {
  try {
    // Get the user ID from the URL
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User deleted" });
  } catch (error) {
    // Handle any error that occurs using the delete route
    next(error);
  }
});

module.exports = router;
