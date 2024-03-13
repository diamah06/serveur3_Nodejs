const express = require("express");
const router = express.Router();

// Import des routes
const reservationRouter = require("./reservationRoute");
const roomRouter = require("./roomRoute");
const spotRouter = require("./spotRoute");
const userRouter = require("./userRoute");
const authRouter = require("./authRoute");

router.use("/reservation", reservationRouter);
router.use("/room", roomRouter);
router.use("/spot", spotRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;



