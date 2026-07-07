const express = require("express");
const router = express.Router();

const auth = require("./authRoute");

router.use("/auth", auth);



module.exports = router;