import { Router } from "express";
const authRouter = Router();
import {register, login, logout} from "../controllers/auth.Controller.js"


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);





export default authRouter