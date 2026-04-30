import express from "express";
import cookieParser from "cookie-parser";

import AuthRoutes from "./routes/auth.Routes.js";



const app =  express();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true                
}));


// use routes
app.use("/api/auth", AuthRoutes);







export default app;