import mongoose from "mongoose";

const jyotisScheme = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: Number, required: true, trim: true },
  aboutguru: { type: String, required: true, trim: true },
  image: String
});

const jyotishModel = mongoose.model("jyotish", jyotisScheme);

export default jyotishModel;
