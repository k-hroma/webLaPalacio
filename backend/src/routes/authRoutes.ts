import { Router } from "express";
import { registerUser, loginUser, registerAdmin } from "../controllers/authControllers";


const authRouter = Router()

authRouter.post("/register", registerUser)
authRouter.post("/admin", registerAdmin)
authRouter.post("/login", loginUser)


export { authRouter }