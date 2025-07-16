import { Router } from "express";
import { registerUser, loginUser, registerAdmin } from "../controllers/authControllers";


const authRouter = Router()

authRouter.post("/user", registerUser)
authRouter.post("/admin", registerAdmin)
authRouter.post("/login", loginUser)


export { authRouter }