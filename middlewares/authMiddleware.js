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
const admin = (req, res, next) => {
  const user = User.findOne(req.user.id);
  if (req.user && user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      status: "error",
      msg: "Not authorized as an admin",
    });
  }
};

export { protect, admin };
