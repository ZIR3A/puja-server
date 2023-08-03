import jwt from "jsonwebtoken";

const checkAdminAuthUser = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (!authorization) return res
    .status(403)
    .send({ message: "A token is required for authentication" });
  if (authorization.split(" ")[0] !== "Bearer") return res.status(403).send({ message: "Invalid Token" });
  try {
    token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  return next();
};

export default checkAdminAuthUser;
