import jwt from "jsonwebtoken";
import { createError } from "../error.js";
export const verifyToken = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return next(createError(401, "You are not authenticated"));
    }
    const token = auth.split(" ")[1];
    if (!token) next(createError(400, "You are not authenticated"));
    const verify = jwt.verify(token, process.env.JWT);
    req.user = verify;
    return next()
  } catch (error) {
    next(error);
  }
};
