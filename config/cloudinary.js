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
      return result;
    }
  });
};

const fileUpload = async (files) => {
  let imageFiles = files;
  let images = [];
  for (let i = 0; i < imageFiles.length; i++) {
    let path = imageFiles[i].path;
    let result= await cloudUpload(path);
    
    images.push({img_id:result.public_id, img_url:result.url});
  }
  return images;
};

const fileDelete= async (id)=>{
  try{
    //delete using img_id
  const result = await cloudinary.uploader.destroy(id)
  console.log(result)
  }catch(error){
    console.log(error)
  }
}

export { cloudinary, cloudUpload, fileUpload ,fileDelete};
