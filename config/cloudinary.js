import cloud from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const cloudinary = cloud.v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudUpload = (filePath) => {
  return cloudinary.uploader.upload(filePath, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      return { url: result.url };
    }
  });
};

const fileUpload = async (files) => {
  let imageFiles = files;
  let images = [];
  for (let i = 0; i < imageFiles.length; i++) {
    let path = imageFiles[i].path;
    let result = await cloudUpload(path);
    images.push(result.url);
  }
  return images;
};

export { cloudinary, cloudUpload, fileUpload };
