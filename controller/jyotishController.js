import jyotishModel from "../model/jyotishModel.js";
import multer from "multer";

const createJyotish = async (req, res) => {
  const { name, email, phone, aboutguru, image } = req.body;

  if (name && email && phone && aboutguru && image) {
    try {
      const addjyotish = await jyotishModel.create({
        name,
        email,
        phone,
        aboutguru,
        image,
      });
      res.send({
        statues: "sucess",
        message: "You are ragister.",
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.send({
      statues: "Failed",
      message: "All feild required.",
    });
  }
};

const showJyotish = async (req, res) => {
  try {
    const jyotiShow = await jyotishModel.find();

    res.send(jyotiShow);
  } catch (error) {
    console.log(error.message);
  }
};

const editJyotish = async (req, res) => {
  console.log(req.params.id);
  try {
    const jyotishFindByID = await jyotishModel.findById(req.params.id);
    
    res.send(jyotishFindByID);
  } catch (error) {
    console.log(error.message);
  }
};

const updateJyotish = async (req, res) => {
  try {
    const result = await jyotishModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );

    res.send({
      statues: "sucess",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteJyotish = async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await jyotishModel.findByIdAndDelete(req.params.id);
     res.send({
       status: "delete",
     });
  } catch (error) {
    console.log(error.message);
  }
};

export {
  createJyotish,
  showJyotish,
  editJyotish,
  updateJyotish,
  deleteJyotish,
};
