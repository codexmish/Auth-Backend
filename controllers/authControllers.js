// --------reg controller

const { regServices } = require("../services/authServices");

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

module.exports = { regController };
