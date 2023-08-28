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

//DOCUMENTATION

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     description: This enables the creation of a new user account.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signup'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type:string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     isAdmin:
 *                       type: boolean
 *                     token:
 *                       type: string
 *               example:
 *                 status: success
 *                 msg : a message sent
 *                 data:
 *                   _id: 6833a9876s098we9203
 *                   name: John Doe
 *                   email: johndoe@email.com
 *                   isAdmin: false
 *                   token: login token
 *
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 msg:
 *                   type: string
 *               example:
 *                 status: error
 *                 msg: an error message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 msg:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                          type: string
 *                       msg:
 *                          type: string
 *                       path:
 *                          type: string
 *                       location:
 *                          type: string
 *
 *
 * */
