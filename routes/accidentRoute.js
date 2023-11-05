const express = require("express");
const route = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  createAccident,
  getAccidentById,
  getallAccident,
  updateAccident,
  deleteAccident,
  rating,
  // uploadImages,
  // deleteImages,
} = require("../src/controllers/accidentCtrl");
const { AccidentImgResize, uploadPhoto } = require("../middlewares/upLoadImages");

route.post("/create-Accident", createAccident);
route.put("/:id", updateAccident); 

route.get("/getall-Accident", authMiddleware, isAdmin, getallAccident);
route.get("/:id", authMiddleware, isAdmin, getAccidentById);
route.delete("/:id", authMiddleware, isAdmin, deleteAccident);

route.post("/rating", authMiddleware, rating);
// route.post(
//   "/upload/",
//   authMiddleware,
//   isAdmin,
//   uploadPhoto.array("images", 10),
//   AccidentImgResize,
//   uploadImages
// );

// route.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);
module.exports = route;
