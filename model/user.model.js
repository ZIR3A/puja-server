import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  name: { type: String, requred: true, trim: true },
  email: { type: String, requred: true, trim: true },
  password: { type: String, requred: true, trim: true }
});

const userModel = mongoose.model("users", userScheme);

export default userModel;
