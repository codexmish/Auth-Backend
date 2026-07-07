const express = require("express");
const {
  regController,
  loginController,
} = require("../../controllers/authControllers");
const router = express.Router();

router.post("/register", regController);
router.post("/login", loginController);

module.exports = router;
