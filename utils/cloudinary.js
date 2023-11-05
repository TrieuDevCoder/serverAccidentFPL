require("dotenv").config();
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dph1ez7yc",
  api_key: "143448948698796",
  api_secret: "b0_a7ZipasjZbPirOS4XgcGkG4A",
});
const cloudinaryUploadImg = async (fileToUpload) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      fileToUpload,
      (result)=>{
        resolve({
          url:result.secure_url,
          asset_id:result.asset_id,
          public_id:result.public_id,
        },
        {
          resource_type:"auto"
        }
        )
      }                          
    );
  });
};
const cloudinaryDeleteImg = async (fileToDelete)=> {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(
      fileToDelete,
      (result)=>{
        resolve({
          url:result.secure_url,
          asset_id:result.asset_id,
          public_id:result.public_id,
        },
        {
          resource_type:"auto"
        }
        )
      }                          
    );
  });
};

module.exports = {cloudinaryUploadImg,cloudinaryDeleteImg};
