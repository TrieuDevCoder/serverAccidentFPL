const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createSupport,
  updateSupport,
  deleteSupport,
  getSupport,
  getAllSupport,
} =require("../src/controllers/typeSupportCtrl");
router.post("/", authMiddleware, isAdmin, createSupport);
router.post("/:id", authMiddleware, isAdmin, updateSupport);
router.delete("/:id", authMiddleware, isAdmin, deleteSupport);

router.get("/:id", getSupport);
router.get("/", getAllSupport);
module.exports = router;

