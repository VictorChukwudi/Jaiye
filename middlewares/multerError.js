import upload from "../config/multer.js";

const checker = upload.array("images");

const checkUpload = (req, res, next) => {
  checker(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: "Error",
        msg: err.message,
      });
    } else {
      next();
    }
  });
};
export default checkUpload;
