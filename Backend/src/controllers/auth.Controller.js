import userModel from "../models/user.models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// =============================
// HELPER — Generate JWT Token
// =============================

const generateToken = (userId, role) => {
  return jwt.sign(
    {
      id: userId, role: role
    },
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_SECRET || "7d"}
  );
};

// =============================
// HELPER — Send Token in Cookie
// =============================

const sendTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 1000,

  });
};

export const register = async (req,res) => {
  
}