import jwt from "jsonwebtoken";
import UserModel from "../models/userModel/user.model.js";

export const verifyuser = async (req, res, next) => {
  try {
    const token = req.cookies?.accesstoken;
 
   
    if (!token) {
      return res.status(400).json({ message: "Unauthorized user" });
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await UserModel.findById(decodeToken?._id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid access token or user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Token verification error", error);
    return res.status(401).json({ message: "Token verification failed" });
  }
};

export const adminCheck = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(401).json({ status: false, error: "Unauthorized" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ status: false, error: err.message });
  }
};