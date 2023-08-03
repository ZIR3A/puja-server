import express from "express";
const router = express.Router();
import {
  userCreate,
  login,
  changePassword,
  adminProfile,
  adminResetPassword,
  adminResetPasswordEmail,
} from "../controller/usertController.js"; 
import checkAuthUser from "../middlerware/userMiddleware.js";

// Route level middleware

router.post("/changepassword", checkAuthUser);
router.post("/adminprofile", checkAuthUser);

// Public Router

router.post("/register", userCreate);
router.post("/login", login);

// Login protected Router

router.post("/changepassword", changePassword);
router.get("/adminprofile", adminProfile);
router.post("/reset", adminResetPassword);
router.post("/reset/:id/:token", adminResetPasswordEmail);

export default router;
