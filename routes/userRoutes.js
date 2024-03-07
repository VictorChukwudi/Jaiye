import express from "express";
import {
  signup,
  login,
  verifySignupMail,
  resendSignupMail,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  setAsAdmin,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
import validator from "../middlewares/validators.js";

const router = express.Router();

router.post("/signup", validator.signup, signup);
router.post("/login", validator.login, login);
router.get("/:userID/:secret", verifySignupMail);
router.post("/resend-mail", resendSignupMail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:userID/:secret", resetPassword);

router.get("/profile", protect, getUserProfile);
router.post("/update-profile", protect, updateUserProfile);

router.get("/set-admin", protect, setAsAdmin);
export default router;
