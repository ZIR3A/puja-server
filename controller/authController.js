import adminModel from "../model/adminModel.js";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../utils/generateToken.js";
import { createAdminValidator } from "../utils/admin.validation.js";
import userModel from "../model/user.model.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) return res.status(422).send({ message: "Credentials required" })

        const user = await userModel.findOne({ email: email });
        if (!user) return res.status(400).send({ message: "User doesn't exists" });

        const isMatch = bcrypt.compare(password, user.password);
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
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        const errMessage = createAdminValidator(name, email, password, confirm_password);
        if (errMessage) return res.status(422).send({ message: errMessage });

        const checkUser = await userModel.findOne({ email });
        if (checkUser) return res.status(409).send({ message: "User already exists. Please Login" });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const admin = await userModel.create({
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

export const refreshToken = async (req, res) => {
    const { refresh_token } = req.body;
    if (!refresh_token) return res.status(422).send({ message: "Refresh token is required" });
    const isValid = verifyRefresh(refresh_token);
    if (!isValid) return res.status(401).send({ message: "Unauthorized" });
    const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    const user = await userModel.findById(id);
    if (!user) return res.status(401).send({ message: "User doesn't exists" });
    const access_token = createAccessToken({ id: user._id });
    return res.status(200).send({ message: "Successfully refreshed", access_token });
};

function verifyRefresh(token) {
    try {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
        return true
    } catch (error) {
        return false;
    }
}