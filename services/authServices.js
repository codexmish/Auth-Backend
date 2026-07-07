const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { isValidateEmail, isValidatePassword } = require("../helpers/utils");
const envConfig = require("../helpers/processEnv");
const { createToken } = require("../helpers/jwt");

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

// -------login services
const loginServices = async (payload) => {
  const { email, password } = payload;

  const errors = {};

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

  // -----checking if user not exist
  const user = await userSchema
    .findOne({ email: email.toLowerCase() })
    .select("+password");

  // ------user valodation

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("invalid credantial");
  }

  if (!user.isEmailVerified) {
    throw new Error("user not verified");
  }

  // -------jwt token part start
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  // -------jwt acc token
  const accessToken = createToken(jwtPayload, envConfig.jwt_access_secret, {
    expiresIn: "1d",
  });

  // -------jwt ref token
  const refreshToken = createToken(jwtPayload, envConfig.jwt_access_secret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

module.exports = { regServices, loginServices };
