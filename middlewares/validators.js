import { check } from "express-validator";

const validator = {
  signup: [
    check("firstname", "Firstname field is required and is a string")
      .exists()
      .isString()
      .bail()
      .notEmpty()
      .trim(),
    check("lastname", "Lastname field is required and is a string")
      .exists()
      .isString()
      .bail()
      .notEmpty()
      .trim(),
    check("phone_no", "Phone_no field is required")
      .exists()
      .bail()
      .notEmpty()
      .trim(),
    check("email", "Email is required (e.g johndoe@email.com) ")
      .exists()
      .bail()
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    check("password", "Password must be at least 6 characters long")
      .exists()
      .bail()
      .notEmpty()
      .isLength({ min: 6 })
      .matches(/\d/)
      .withMessage("Password must contain at least a digit"),
    check("confirmpassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password does not match");
      }
      return true;
    }),
  ],
  login: [
    check("email", "Email is required")
      .exists()
      .bail()
      .isEmail()
      .normalizeEmail(),
    check("password", "Password is required").exists().bail().not().isEmpty(),
  ],
  event: [
    check("title", "Event title is required")
      .exists()
      .bail()
      .notEmpty()
      .isString(),
    check("organizer", "Event organizer is required")
      .exists()
      .bail()
      .notEmpty()
      .isString(),
    check("type", "Event type is required")
      .exists()
      .bail()
      .notEmpty()
      .isString(),
    check("category", "Event category is required")
      .exists()
      .bail()
      .notEmpty()
      .isString(),
    check("desc", "Event description is required")
      .exists()
      .bail()
      .notEmpty()
      .isString(),
    check(
      "tags",
      "Event tags required. A minimum of 2 tags and maximum of 5 tags."
    )
      .exists()
      .bail()
      .isArray({ min: 2, max: 5 }),
  ],
};

export default validator;
