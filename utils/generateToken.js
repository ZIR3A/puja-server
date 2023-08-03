import jwt from "jsonwebtoken";
import { Config } from "../config/Config.js";

export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: Config.ACCESS_TOKEN_EXPIRY_TIME,
  });
};
export const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: Config.REFRESH_TOKEN_EXPIRY_TIME,
  });
};
