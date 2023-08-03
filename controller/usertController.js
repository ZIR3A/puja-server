import adminUserModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import transpoter from "../config/emailConfig.js";

//  admin user Registaer user create

const userCreate = async (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const findEmail = await adminUserModel.findOne({ email: email });

    if (findEmail) {
      res.send({
        status: "Faild",
        message: "This email already used Please use next email.",
      });
    } else {
     
        try {
          const salt = await bcrypt.genSalt(10);
          const hasPassword = await bcrypt.hash(password, salt);
          const creatUser = await adminUserModel.create({
            name,
            email,
            password: hasPassword,
            
          });

          const letest_saveAdmin = await adminUserModel.findOne({
            email: email,
          });

          const token = jwt.sign(
            { userID: letest_saveAdmin._id },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.send({
            status: "Success",
            message: "You are ragister.",
            token: token,
          });
        } catch (error) {
          console.log(error.message)
        }
     
    }
  } else {
    res.status(404).send({
      status: "Faild",
      message: "All Feild are require.",
    });
  }
};

// Ragister admin user login

const login = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const findRegisterEmail = await adminUserModel.findOne({ email: email });

    if (findRegisterEmail) {
      const passwordCompire = await bcrypt.compare(
        password,
        findRegisterEmail.password
      );

      if (findRegisterEmail.email === email && passwordCompire) {
        const token = jwt.sign(
          { userID: findRegisterEmail._id },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "5d" }
        );
        res.send({
          status: "Success",
          message: "Login successfull.",
          token: token,
        });
      } else {
        res.send({
          status: "Faild",
          message: "All Feild are require.",
        });
      }
    } else {
      res.send({
        status: "Faild",
        message: "All Feild are require.",
      });
    }
  } else {
    res.send({
      status: "Faild",
      message: "All Feild are require.",
    });
  }
};

// ragister admin password change

const changePassword = async (req, res) => {
  const { password, comfirmpassword } = req.body;
  if (password && comfirmpassword) {
    if (password !== comfirmpassword) {
      res.status(404).send({
        status: "Faild",
        message: " Password erorr.",
      });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(password, salt);
        await adminUserModel.findByIdAndUpdate(req.body._id, {
          $set: {
            password: hasPassword,
          },
        });
      } catch (error) {}
    }
  } else {
    res.status(404).send({
      status: "Faild",
      message: " Password erorr.",
    });
  }
};

// Ragister admin find profile self

const adminProfile = async (req, res) => {
  res.status(200).send({ adminProfile: adminUserModel.req });
};

//Ragister admin Reset password email send
const adminResetPassword = async (req, res) => {
  const { email } = req.body;

  if (email) {
    const findAdimnEmail = await adminUserModel.findOne({ email: email });
    if (findAdimnEmail) {
      const scretekey = findAdimnEmail._id + process.env.ACCESS_TOKEN_SECRET_KEY;
      const token = jwt.sign({ userID: findAdimnEmail._id }, scretekey, {
        expiresIn: "30m",
      });
      const link = `http://localhost:3000/api/user/reset/${findAdimnEmail._id}/${token}`;

      //send email
      const sendEmail = await transpoter.sendMail({
        from: process.env.EMAIL_FROM,
        to: findAdimnEmail.email,
        subject: "Password Reset",
        html: `<a href=${link}>Click here </a>Reset Your Password.`,
      });
      res.status(202).send({
        status: "Success",
        message: "Send Email Please check your email.",
      });
    } else {
      res.status(404).send({
        status: "Faild",
        message: "Not Found Email.",
      });
    }
  } else {
    res.status(404).send({
      status: "Faild",
      message: "Please Input Email.",
    });
  }
};

// Ragister admin reset password from email link

const adminResetPasswordEmail = async (req, res) => {
  const [password, comfirmpassword] = req.body;
  const [id, token] = req.params;
  const admin = await adminUserModel.findById(id);
  const newSecret = admin + process.env.ACCESS_TOKEN_SECRET_KEY;

  try {
    jwt.verify(token, newSecret);
    if (password && comfirmpassword) {
      if (password === comfirmpassword) {
        const salt = await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(password, salt);
        await adminUserModel.findByIdAndUpdate(req.body._id, {
          $set: {
            password: hasPassword,
          },
        });
      } else {
        res.status(404).send({
          status: "Faild",
          message: "Password does't Match.",
        });
      }
    } else {
      res.status(404).send({
        status: "Faild",
        message: "Please input password.",
      });
    }
  } catch (error) {}
};

export {
  userCreate,
  login,
  changePassword,
  adminProfile,
  adminResetPassword,
  adminResetPasswordEmail,
};
