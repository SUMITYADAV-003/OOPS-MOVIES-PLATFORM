import  mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dontenv from "dotenv";
import userModel from "./src/models/user.models.js";


dontenv.config();

const createAdmin = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
    
    // check admin already exites 
    const exitingAdmin  = await userModel.findOne({role: "admin"});
    if(exitingAdmin){
      console.log("Admin already exites! ");
      console.log("Email -> ", exitingAdmin);
      process.exit(1);
    }

    // Hash  Password
    const hashPassword = await bcrypt.hash("Sumit@123", 10);

    //crete admin
    const admin = await userModel.create({
      username: "admin",
      email: "admin@movieapp.com",
      password: hashPassword,
      role: "admin",
    });

    console.log("=========================");
    console.log("Admin Creted Successfully");
    console.log("Email   -> ", admin.email);
     console.log("Password → ", "Sumit@123");
    console.log("Role     → ", admin.role);
    console.log("=============================");

    process.exit(0);


  } catch(error){
     console.log("Error ", error.message);
    process.exit(1);

  }

};

createAdmin();