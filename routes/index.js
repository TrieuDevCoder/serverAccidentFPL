var express = require('express');
var router = express.Router();
const {authenWeb} = require("../middlewares/authMiddleware");
const UserCtrl = require("../src/controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
router.get("/login", authenWeb, async (req, res, next) => {
  res.render("user/login");
});
/* GET home page. */
router.get("/", authenWeb, async (req, res, next) => {
  res.render("index");
});
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await UserCtrl.loginUserCtrl(email, password);

    // Đăng nhập thành công
    if (result) {
      return res.redirect('/'); // Điều hướng đến trang chính
    } else {
      // Đăng nhập không thành công, chuyển hướng lại trang đăng nhập
      return res.redirect('/login');
    }
  } catch (error) {
    // Xử lý lỗi ở đây
    console.error(error);
    return res.redirect("/login"); // Xử lý lỗi và chuyển hướng lại trang đăng nhập
  }
});


module.exports = router;
