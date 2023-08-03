import express from "express";
const adminRouter = express.Router();

import {
  createAdmin,
  showAdmin,
  deleteAdmin,
  loginAdmin,
} from "../controller/adminController.js";
import checkAdminAuthUser from "../middlerware/adminMiddleware.js";
import { refreshToken } from "../controller/refreshTokenController.js";

adminRouter.get("/", checkAdminAuthUser, showAdmin);
adminRouter.post("/", createAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/refresh", refreshToken);

adminRouter.post("/delete/:id", deleteAdmin);

export default adminRouter;
