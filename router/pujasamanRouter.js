import express from "express";
const pujasamanRouter = express.Router();
import {
 
  createPujasaman,
  showPujasaman,
  editPujasaman,
  updatePujasaman,
  deletePujasaman,
  
} from "../controller/pujasamanController.js";


pujasamanRouter.post("/", createPujasaman);
pujasamanRouter.get("/", showPujasaman);
pujasamanRouter.get("/edit/:id", editPujasaman);
pujasamanRouter.put("/update/:id", updatePujasaman);
pujasamanRouter.delete("/delete/:id", deletePujasaman);


export default pujasamanRouter;
