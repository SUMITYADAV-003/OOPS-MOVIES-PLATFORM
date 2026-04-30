import jwt from "jsonwebtoken";
import userModel from "../models/user.models";

export const protect = async (req,res,next) => {
  try {
    const token = req.cookies?.token;

    if(!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded
    next();




  } catch(error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
    
  }

  export const adminOnly = (req,res,next) => {
    if(req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied - Admin only",
      })
    }
  }
  next();




};