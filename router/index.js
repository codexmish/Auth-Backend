const express = require("express");
const envConfig = require("../helpers/processEnv");
const router = express.Router();
const authRoute = require("./authRoute");

router.use(envConfig.BASE_URL, authRoute);

module.exports = router;