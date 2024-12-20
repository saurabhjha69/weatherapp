import { Router } from "express";
import { handleAllHistory, handleWeatherCheck } from "../controllers/userController.js";

export const userRouter = Router()

userRouter.post('/get-weather',handleWeatherCheck)
userRouter.get('/history',handleAllHistory)