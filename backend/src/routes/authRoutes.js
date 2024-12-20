import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { handleLogin, handleRegister } from "../controllers/authControllers.js";

export const authRouter = Router()

authRouter.post('/register',handleRegister)
authRouter.post('/login',handleLogin)