import userModel from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// =============================
// HELPER — Generate JWT Token
// =============================
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" } // ✅ FIXED
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
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// =============================
// REGISTER
// =============================
export const register = async (req, res) => {
  try {
    const { username, email, role, password } = req.body;

    // 1. Check all fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Check existing user
    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already taken",
      });
    }

    // 3. Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // 4. Handle role
    let assignedRole = "user";

    if (role === "admin") {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(403).json({
          success: false,
          message: "Only admins can create admin accounts",
        });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Only admins can create admin accounts",
        });
      }
      assignedRole = "admin";
    } // ✅ if block closes HERE — outside below code

    // 5. Create user — runs for EVERYONE ✅
    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
      role: assignedRole,
    });

    // 6. Generate token & send cookie
    const jwtToken = generateToken(newUser._id, newUser.role);
    sendTokenCookie(res, jwtToken);

    // 7. Send response
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email, // ✅ FIXED
        role: newUser.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const login = async(req,res) => {
  try{
    const {email, password, username} = req.body;

  if(!email || !password){
    return res.status(400).json({
      success:  false,
      message: "Email and password are required",
    })
  }

  const user = await userModel.findOne({
    $or: [
      {username},
      {email},
    ]
  }).select("+password")
  if(!user){
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
   // 3. Compare password
   const isPasswordMatch = await bcrypt.compare(password, user.password);
   if(!isPasswordMatch){
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    })
   }

   // 4 Generate token & send cookie
   const jwtToken = generateToken(user._id, user.role);
   sendTokenCookie(res,jwtToken);

   // 5 Send responce  based on role
   res.status(200).json({
    success: true,
    message: `Welcome back ${user.username}!`,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    },

   })


  } catch(error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
  

};

export const logout = async(req,res) => {
  try {
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }

};

export const getMe  = async(req,res) => {
  const user = await userModel.findById()
}