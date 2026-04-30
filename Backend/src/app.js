import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import AuthRoutes from "./routes/auth.Routes.js";



const app =  express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5174", 
  credentials: true                
}));


// use routes
app.use("/api/auth", AuthRoutes);







export default app;