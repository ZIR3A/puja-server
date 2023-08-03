import adminModel from "../model/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAdminValidator } from "../utils/admin.validation.js";
import { Config } from "../config/Config.js";
import { createAccessToken, createRefreshToken } from "../utils/generateToken.js";

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    const errMessage = createAdminValidator(name, email, password, confirm_password);
    if (errMessage) return res.status(422).send({ message: errMessage });

    const checkUser = await adminModel.findOne({ email });
    if (checkUser)
      return res.status(409).send({ message: "User already exists. Please Login" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const admin = await adminModel.create({
      name,
      email,
      password: hashPassword,
      confirm_password: hashPassword,
    });
    // Create token
    const token = jwt.sign(
      { user_id: admin._id, email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    admin.token = token;
    await admin.save();
    res.status(200).send({ message: "Successfully Registered, Please Login now" });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" })
  }
};

// const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email && !password) return res.status(422).send({ message: "Credentials required" })

//     const checkUser = await adminModel.findOne({ email: email });
//     if (!checkUser) {
//       return res.status(401).send({ message: "User doesn't exists" });
//     } else {
//       const isMatch = await bcrypt.compare(password, checkUser.password);
//       if (!isMatch) return res.status(422).json({ message: "Incorrect password" });
//       const accessToken = jwt.sign(
//         { userID: checkUser._id, email },
//         process.env.ACCESS_TOKEN_SECRET_KEY,
//         {
//           expiresIn: Config.ACCESS_TOKEN_EXPIRY_TIME,
//         }
//       );
//       const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET_KEY, {
//         expiresIn: Config.REFRESH_TOKEN_EXPIRY_TIME,
//       });
//       checkUser.accessToken = accessToken;
//       checkUser.refreshToken = refreshToken;
//       await checkUser.save();
//       res.status(200).send({
//         message: "Successfully logged in",
//         data: { isAuthorised: true, accessToken: accessToken, refreshToken: refreshToken, username: checkUser.name, email: checkUser.email, type: checkUser.type },
//       });
//     }
//   } catch (error) {
//     res.status(500).send({ error: error.message })
//   }
// };
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) return res.status(422).send({ message: "Credentials required" })

    const user = await adminModel.findOne({ email: email });
    if (!user) return res.status(400).send({ message: "User doesn't exists" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });
    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });
    await user.save();
    res.status(200).send({
      message: "Login Successfully",
      access_token,
      refresh_token,
      data: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
};

const showAdmin = async (req, res) => {
  try {
    const adminList = await adminModel.find();

    res.send(adminList);
  } catch (error) {
    res.send(error.message);
  }
};

async function deleteAdmin(req, res) {
  try {
    const adminDelet = await adminModel.findByIdAndDelete(req.params.id);

    res.send({
      ststuse: "sucess",
      message: "Delete admin.",
    });
  } catch (error) {
    res.send(error.message);
  }
}

export { loginAdmin, createAdmin, showAdmin, deleteAdmin };
