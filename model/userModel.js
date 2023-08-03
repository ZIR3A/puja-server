import mongoose from "mongoose";

const adminUser = new mongoose.Schema({
  name: { type: String, requred: true, trim: true },
  email: { type: String, requred: true, trim: true },
  password: { type: String, requred: true, trim: true }
});

const adminUserModel = mongoose.model("adminuser", adminUser);

export default adminUserModel;
