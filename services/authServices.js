const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { isValidateEmail, isValidatePassword } = require("../helpers/utils");
const envConfig = require("../helpers/processEnv");

// -------registration services
const regServices = async (email, name, password) => {
  const errors = {};

  // ---name validatine
  if (!name) {
    errors.name = "Name is required";
  }

  // ---email validatine
  if (!email) {
    errors.email = "Email is required";
  } else if (!isValidateEmail(email)) {
    errors.email = "Email not valid";
  }

  // ---password validatine
  if (!password) {
    errors.password = "Password is required";
  } else if (!isValidatePassword(password)) {
    errors.password = "Password not valid";
  }

  // --------sending errors
  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  // ---------checking if email already exist
  const existemail = await userSchema.findOne({ email });

  if (existemail) {
    throw new Error("User already exist try another email");
  }

  // ----------password hashing
  const hashedPassword = await bcrypt.hash(
    password,
    Number(envConfig.SALT_ROUND),
  );

  // -------creating user
  const userData = await userSchema.create({
    name,
    email,
    password: hashedPassword,
  });

  return { data: userData };
};

module.exports = { regServices };
