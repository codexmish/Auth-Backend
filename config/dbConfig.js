const mongoose = require("mongoose");
const envConfig = require("../helpers/processEnv");

const dbConfig = async () => {
  try {
    await mongoose.connect(envConfig.DB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = dbConfig;