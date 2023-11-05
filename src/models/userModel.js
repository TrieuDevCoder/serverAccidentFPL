const mongoose = require("mongoose"); // Import thư viện mongoose cho việc làm việc với MongoDB
const bcrypt = require("bcryptjs"); // Import thư viện bcryptjs để mã hóa mật khẩu
const crypto = require("crypto"); // Import thư viện crypto để tạo mã thông báo đặt lại mật khẩu

// Khai báo Schema của đối tượng User trong MongoDB
var userSchema = new mongoose.Schema( {
    // Thông tin cá nhân của người dùng
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email phải là duy nhất
    },
    mobile: {
      type: String,
      required: true,
      unique: true, // Số điện thoại phải là duy nhất
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user", // Vai trò mặc định là "user"
    },
    image:[],
    duty:{
      type:String,
      default: "Student",
    },
    // Các thông tin khác về người dùng
    address: {
      type: String,
    },

    // Thông tin liên quan đến đặt lại mật khẩu
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true } // Sử dụng timestamps để tự động tạo createdAt và updatedAt
);

// Middleware trước khi lưu đối tượng User
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10); // Tạo muối (salt)
  this.password = await bcrypt.hash(this.password, salt); // Mã hóa mật khẩu
});

// Phương thức kiểm tra tính khớp của mật khẩu
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// // Phương thức tạo mã thông báo đặt lại mật khẩu
// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex"); // Tạo token ngẫu nhiên
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex"); // Mã hóa token
//   this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 phút sau
//   return resetToken; // Trả về token ngẫu nhiên
// }

// Xuất mô hình User để sử dụng trong ứng dụng
module.exports = mongoose.model("User", userSchema);
