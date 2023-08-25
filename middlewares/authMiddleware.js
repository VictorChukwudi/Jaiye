import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user/userModel.js";

dotenv.config();

//User Authorization Access
const protect = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (typeof authHeader !== "undefined") {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(400).json({
          status: "Error",
          msg: "Session Expired. Signin again." || err.message,
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).json({
      status: "Error",
      msg: "Unauthorized. Login or signup to view this resource",
    });
  }
};

//Admin Authorization Access
const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as admin");
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};

export { protect, admin };
