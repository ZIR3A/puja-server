import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { join } from "path";

import router from "./router/userRouter.js";

import dbconection from "./config/databaseConfig.js";
import jyotishRouter from "./router/jyotishRouter.js";
import pujasamanRouter from "./router/pujasamanRouter.js";
import adminRouter from "./router/adminRouter.js";
import auth from "./router/authRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const database = process.env.DATABASE_URL;
const dbcon = await dbconection(database);

//cors policy

app.use(cors());
app.use(express.json());

app.use(express.static(join(process.cwd(), "public")));

app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);
app.use("/api/admin", adminRouter);
app.use("/api/jyotish", jyotishRouter);
app.use("/api/pujasaman", pujasamanRouter);
app.use("/api", auth);

app.listen(port, () => {
  console.log(`sever run at http://localhost:${port}`);
});
