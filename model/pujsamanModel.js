import mongoose from 'mongoose';

const pujaSamanSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  quantity: { type: String, required: true, trim: true },
  price: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  description: { type: String, required: false, trim: true }
});

const pujaSamanModel = mongoose.model("pujasamagri", pujaSamanSchema);

export default pujaSamanModel;