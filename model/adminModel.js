import mongoose, { mongo } from 'mongoose';


const adminModelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  confirm_password: { type: String, required: true, trim: true },
});

const adminModel = mongoose.model("admin", adminModelSchema);

export default adminModel;
