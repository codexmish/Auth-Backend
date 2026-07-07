// --------reg controller

const { regServices } = require("../services/authServices");

const regController = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const result = await regServices(email, name, password);

  res.status(200).json({message: "safasfasrf", errors: result})
  } catch (error) {
    res.status(200).json({message: error.message})
  }
};

module.exports = { regController };
