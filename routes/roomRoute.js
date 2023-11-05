const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRoom,
} =require("../src/controllers/roomCtrl");
router.post("/", authMiddleware, isAdmin, createRoom);
router.post("/:id", authMiddleware, isAdmin, updateRoom);
router.delete("/:id", authMiddleware, isAdmin, deleteRoom);

router.get("/:id", getRoom);
router.get("/", getAllRoom);
module.exports = router;

