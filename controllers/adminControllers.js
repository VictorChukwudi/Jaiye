import User from "../models/user/userModel.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).select(["-password"]);
    res.status(200).json({
      status: "success",
      msg: "All users displayed",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
};

export { getAllUsers };
