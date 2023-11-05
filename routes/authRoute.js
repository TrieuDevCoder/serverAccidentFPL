const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  logout,
  loginAdmin,
  handleRefreshToken,
  saveAddress,
} = require("../src/controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/admin-login",loginAdmin);
router.get("/all-users", getallUser);
router.get("/logout", logout);
router.get("/refresh",handleRefreshToken); 
router.delete("/:id", deleteaUser);

router.post("/save-address",authMiddleware,saveAddress)

router.get("/:id",authMiddleware,isAdmin, getaUser);
router.post("/edit-user",authMiddleware,isAdmin ,updatedUser);

module.exports = router;
