import { Router } from "express";


const authRouter = Router()

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)


export {authRouter }