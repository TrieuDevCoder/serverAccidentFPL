const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dph1ez7yc",
  api_key:"143448948698796",
  api_secret: "b0_a7ZipasjZbPirOS4XgcGkG4A",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pod-cards", // Thay đổi tên thư mục theo nhu cầu
    allowed_formats: ["mp3", "wav", "ogg"], // Định dạng tệp âm thanh cho phép
  },
});

const uploadAudio = multer({
  storage: storage,
  limits: { fileSize: 20000000 }, // Giới hạn kích thước tệp âm thanh (20MB)
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb({
        message: "Unsupported audio format",
      }, false);
    }
  },
});

module.exports = uploadAudio;

  



