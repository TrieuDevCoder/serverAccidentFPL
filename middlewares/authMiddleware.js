const User = require("../src/models/userModel");
require('dotenv').config();
const jwt=require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const authMiddleware=asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        try {
            token=req.headers.authorization.split(" ")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            const user=await User.findById(decoded.id);
            req.user=user;
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized,token failed");
        }
    }else{
        res.status(401);
        throw new Error("Not authorized,no token");
    }
});
const isAdmin=asyncHandler(async(req,res,next)=>{
   const {email}=req.user;
   const adminUser=await User.findOne({email});
   if(adminUser.role!=="admin"){
      throw new Error("You are not an admin")
   }else{
    next();
   }
}); 
const authenWeb = asyncHandler(async (req, res, next) => {
    const { session } = req;
    const url = req.originalUrl.toLowerCase();
    if (!session) {
      //neu chua login
      if (url.includes("login")) {
        return next();
      } else {
        return res.redirect("/login");
      }
    } else {
      const { token } = session;
      if (!token) {
        if (url.includes("login")) {
          return next();
        } else {
          return res.redirect("/login");
        }
      } else {
        jwt.verify(token, "secret", function (error, decoded) {
          if (error) {
            if (url.includes("login")) {
              return next();
            } else {
              return res.redirect("/login");
            }
          } else {
            //kiem tra role
            const { role } = decoded;
            if (role < AppConstants.ROLES.ADMIN) {
              //xoa session
              req.session.destroy();
              //ve login
              return res.redirect("/login");
            } else {
              //neu da login
              if (url.includes("login")) {
                //qua home
                return res.redirect("/");
              } else {
                return next();
              }
            }
          }
        });
      }
    }
  });
module.exports={authMiddleware,isAdmin,authenWeb}
