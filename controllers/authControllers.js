const { regServices, loginServices } = require("../services/authServices");

// -------registration controller
const regController = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const result = await regServices(email, name, password);

    if (result.errors) {
      res.status(400).json({
        success: false,
        message: "Please provide all corect information",
        errors: result.errors,
      });
    }

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------login controller

const loginController = async (req, res) => {
  try {
    const result = await loginServices(req.body);
    const { accessToken, refreshToken } = result;

    // ----set token on cookies
    res.cookie("acc_tkn", accessToken);

    res.cookie("ref_tkn", refreshToken);

    res.status(200).json({
      success: true,
      message: "Login successfull",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { regController, loginController };
