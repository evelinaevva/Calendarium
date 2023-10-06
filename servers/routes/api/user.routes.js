const router = require("express").Router();
const userController = require("../../controllers/user.controller");
const { body } = require("express-validator");


router.post(
  "/registration",
  body("email").isEmail(),
  body("password1").isLength({ min: 3, max: 32 }),
  userController.registration
);

router.get("/session", userController.session);


router.post("/login", body("email").isEmail(), userController.login);

router.delete("/logout", userController.logout);


module.exports = router;
