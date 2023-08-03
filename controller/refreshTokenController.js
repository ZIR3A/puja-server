import jwt from "jsonwebtoken";
import adminModel from "../model/adminModel.js";
import { createAccessToken } from "../utils/generateToken.js";

export const refreshToken = async (req, res) => {
    const { refresh_token } = req.body;
    if (!refresh_token) return res.status(422).send({ message: "Refresh token is required" });
    const isValid = verifyRefresh(refresh_token);
    if (!isValid) return res.status(401).send({ message: "Unauthorized" });
    const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    const user = await adminModel.findById(id);
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