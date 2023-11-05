const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createAccident,
  updateAccident,
  deleteAccident,
  getAccident,
  getAllAccident,
} =require("../src/controllers/typeAccidentCtrl");
router.post("/", authMiddleware, isAdmin, createAccident);
router.post("/:id", authMiddleware, isAdmin, updateAccident);
router.delete("/:id", authMiddleware, isAdmin, deleteAccident);

router.get("/:id", getAccident);
router.get("/", getAllAccident);
module.exports = router;

