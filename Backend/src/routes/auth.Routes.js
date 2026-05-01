import { Router } from "express";
const authRouter = Router()
import {register, login, logout,getMe} from "../controllers/auth.Controller.js";
import {protect} from "../middleware/Protect.middleware.js"


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/getme", protect, getMe);





export default authRouter