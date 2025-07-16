import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authControllers";


const authRouter = Router()

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)


export {authRouter }