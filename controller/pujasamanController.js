import pujaSamanModel from "../model/pujsamanModel.js";

const createPujasaman = async (req, res) => {
 
  const { name, quantity, price, image } = req.body;
  if (name && quantity && price && image) {
    try {
      const pujasamanCreate = await pujaSamanModel.create({
        name,
        quantity,
        price,
        image,
      });

      res.send({
        status: "added",
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.send({
      statuse: "failed",
      message: "Please input all feild.",
    });
  }
};

const showPujasaman = async (req, res) => {
  try {
    const pujasaman = await pujaSamanModel.find();
    console.log(pujasaman);
    res.send(pujasaman);
  } catch (error) {
    console.log(error.message);
  }
};

const editPujasaman = async (req, res) => {
 
  try {
    const pujasamanEdit = await pujaSamanModel.findById(req.params.id);
    res.send(pujasamanEdit);

    
  } catch (error) {
    console.log(error.message);
  }
};

const updatePujasaman = async (req, res) => {
  try {
    const pujasamanUpdate = await pujaSamanModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
      res.send({
        status: "update",
        
      });
  } catch (error) {
    console.log(error.message);
  }
};

const deletePujasaman = async (req, res) => {
  try {
    const pujasamanDelete = await pujaSamanModel.findByIdAndDelete(req.params.id);
    
     res.send({
       status: "delete",
     });
  } catch (error) {
    console.log(error.message);
  }
};



export {
  
  createPujasaman,
  showPujasaman,
  editPujasaman,
  updatePujasaman,
  deletePujasaman,
  
};
