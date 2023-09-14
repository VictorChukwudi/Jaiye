import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../models/user/userModel.js";
import { signupEmail } from "../utils/emails/signupEmail.js";
import generateToken from "../utils/secretsAndTokens/generateToken.js";
import generateSecret from "../utils/secretsAndTokens/generateSecret.js";

import Verification from "../models/user/mailVerify.js";
import PasswordToken from "../models/user/passwordToken.js";
import { passwordEmail } from "../utils/emails/passwordEmail.js";

//Signup Controller
const signup = async (req, res) => {
  try {
    const { firstname, lastname, phone_no, email, password, confirmpassword } =
      req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        msg: errors.array(),
      });
    } else {
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400);
        throw new Error("Email is already registered. User already exists");
      }

      const user = new User({
        firstname,
        lastname,
        phone_no,
        email,
        password,
      });

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            res.status(500);
            console.log(err);
            throw new Error("error occurred while password hashing");
          } else {
            user.password = hash;
            user.save().then((result) => {
              const firstname = user.firstname;
              const email = user.email;
              // generating secret for email verification
              const secret = generateSecret();
              //hashing secret and storing it synchronously for email verification
              const secretSalt = bcrypt.genSaltSync(10);
              const secretHash = bcrypt.hashSync(secret, secretSalt);

              //Verification code, created date and expiration date
              new Verification({
                userID: result._id,
                secret: secretHash,
                createdAt: Date.now(),
                expiresAt: Date.now() + 900000,
              }).save();
              signupEmail({ firstname, email, secret }, req, res);
            });
          }
        });
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};

//Verify Email Controller
const verifySignupMail = async (req, res) => {
  try {
    const { userID, secret } = req.params;
    const user = await User.findById(userID).select(["-password", "-__v"]);
    //Check whether user exists or not
    if (!user) {
      res.status(404);
      throw new Error("user does not exists");
    } else {
      if (user.emailVerified) {
        res.status(200).json({
          status: "success",
          msg: "email has already been verified",
        });
      } else {
        const details = await Verification.findOne({ userID: userID });
        console.log(details.expiresAt);
        //checking if verification token has expired
        if (details.expiresAt < Date.now()) {
          Verification.deleteMany({ userID });
          res.status(400);
          throw new Error("Verification link has expired");
        } else {
          const checkSecret = await bcrypt.compare(
            secret.toString(),
            details.secret
          );
          if (!checkSecret) {
            Verification.deleteMany({ userID });
            res.status(400);
            throw new Error("Invalid verification link");
          } else {
            const updateUser = await User.findByIdAndUpdate(
              userID,
              {
                emailVerified: true,
              },
              { new: true }
            ).select(["-password", "-__v"]);
            await Verification.findOneAndDelete({ userID });
            res.status(200).json({
              status: "success",
              msg: "email successfully verified",
              data: updateUser,
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};

//Resend Verification Email Controller
const resendSignupMail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400);
      throw new Error("enter your registered email address");
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404);
        throw new Error("email is not registered. signup");
      } else {
        if (user.emailVerified) {
          res.status(200).json({
            status: "success",
            msg: "Email already verified",
          });
        } else {
          const firstname = user.firstname;
          // generating secret for email verification
          const secret = generateSecret();
          //hashing secret and storing it synchronously for email verification
          const secretSalt = bcrypt.genSaltSync(10);
          const secretHash = bcrypt.hashSync(secret, secretSalt);

          await new Verification({
            userID: user._id,
            secret: secretHash,
            createdAt: Date.now(),
            expiresAt: Date.now() + 180000,
          }).save();
          signupEmail({ firstname, email, secret }, req, res);
        }
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};

//Login Controller
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user && user.password) {
        if (await bcrypt.compare(password, user.password)) {
          res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            phone_no: user.phone_no,
            email: user.email,
            isAdmin: user.isAdmin,
            emailVerified: user.emailVerified,
            token: generateToken(user._id),
          });
        } else {
          res.status(401);
          throw new Error("Invalid email or password.");
        }
      } else {
        res.status(401);
        throw new Error("Signup or Login with socials");
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};

//Forgot Password Controller
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400);
      throw new Error("enter your registered email address");
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404);
        throw new Error("email is not registered. signup");
      } else {
        // generating secret for email verification
        const secret = generateSecret();
        //hashing secret and storing it synchronously for email verification
        const secretSalt = bcrypt.genSaltSync(10);
        const secretHash = bcrypt.hashSync(secret, secretSalt);
        new PasswordToken({
          userID: user._id,
          secret: secretHash,
          createdAt: Date.now(),
          expiresAt: Date.now() + 900000,
        }).save();

        passwordEmail({ email, secret }, req, res);
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};

//Reset Password Controller
const resetPassword = async (req, res) => {
  try {
    const { userID, secret } = req.params;
    const { password, confirmpassword } = req.body;
    if (!password || !confirmpassword) {
      res.status(400);
      throw new Error("password and confirmpassword fields are empty");
    } else {
      const user = await User.findById(userID);
      if (!user) {
        res.status(404);
        throw new Error("user does not exist");
      } else {
        const token = await PasswordToken.findOne({ userID });
        if (!token) {
          res.status(400);
          throw new Error("invalid link");
        } else {
          if (
            token.expiresAt < Date.now() ||
            !(await bcrypt.compare(secret, token.secret))
          ) {
            await PasswordToken.deleteMany({ userID });
            res.status(400);
            throw new Error("Invalid link or link has expired");
          } else {
            const newPassword = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(userID, {
              $set: { password: newPassword },
            });
            await PasswordToken.findOneAndDelete({ userID });
            res.status(200).json({
              status: "success",
              msg: "password successfully reset.",
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};

//Get User Profile Controller
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // console.log(req.user);
    if (user) {
      res.status(200).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone_no,
        email: user.email,
        isAdmin: user.isAdmin,
        emailVerified: user.emailVerified,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};

//Update Profile Controller
const updateUserProfile = async (req, res) => {
  try {
    const { firstname, lastname, phone_no, email } = req.body;
    const user = await User.findById(req.user.id);

    if (user) {
      const updatedUser = {
        firstname: firstname || user.firstname,
        lastname: lastname || user.lastname,
        phone: phone_no || user.phone_no,
        email: email || user.email,
      };

      const details = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updatedUser },
        { new: true }
      ).select(["-__v", "-password", "-createdAt", "-updatedAt"]);

      res.status(201).json({
        status: "success",
        msg: "Details updated",
        data: details,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};

const setAsAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      await User.findByIdAndUpdate(req.user.id, { isAdmin: true });
      res.status(200).json({
        status: "success",
        msg: "assigned as admin successfully",
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};
export {
  signup,
  login,
  verifySignupMail,
  resendSignupMail,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  setAsAdmin,
};
