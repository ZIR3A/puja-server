import express from "express";
const jyotishRouter = express.Router();
import {
 
  createJyotish,
  showJyotish,
  editJyotish,
  updateJyotish,
  deleteJyotish,
  
} from "../controller/jyotishController.js";






jyotishRouter.post("/add", createJyotish);
jyotishRouter.get("/", showJyotish);
jyotishRouter.get("/edit/:id", editJyotish);
jyotishRouter.put("/update/:id", updateJyotish);
jyotishRouter.delete("/delete/:id", deleteJyotish);


export default jyotishRouter;
