import express from "express";
const auth = express.Router();

import { createUser, login, refreshToken } from "../controller/authController.js";

auth.post("/login", login);
auth.post("/user/create", createUser);
auth.post("/refresh", refreshToken);

export default auth;
