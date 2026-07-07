const express = require("express");
const { regController } = require("../../controllers/authControllers");
const router = express.Router();

router.post("/register", regController);

module.exports = router;
