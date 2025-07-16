import { Request, Response, NextFunction } from "express"
import { loginUserBody, LoginUserSchema, registerUserBody, RegisterUserSchema } from "../schemas/authSchema"
import { QueryResponse } from "../types/queryResponse"
import { User } from "../models/authModel"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// registro de usuario común ----> auth/ register
const registerUser = async (req: Request<{}, {}, registerUserBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  const parseUserRegisterData = RegisterUserSchema.safeParse(req.body)
  if (!parseUserRegisterData.success) { 
    const errMsg = "Invalid user registration data.";
    res.status(400).json({
      success: false,
      message: errMsg,
      error: parseUserRegisterData.error
    });
    console.error(`${errMsg}: `, parseUserRegisterData.error)
    return;
  }
  const { name, email, password } = parseUserRegisterData.data
  const existingUser = await User.findOne({ email })
  if (existingUser) { 
    const errMsg = "Email is already registered.";
    res.status(409).json({
      success: false, 
      message: errMsg
    })
    console.error(errMsg)
    return
  }
  const hashedPassword = await bcryptjs.hash(password, 10)
  try {
    const newUser = await User.create({ name, email, password: hashedPassword })
    const msg = "User successfully registered.";
    res.status(201).json({
      success: true,
      message: msg,
      data: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      
    });
    console.log(`User successfully registered. ID: ${newUser._id}, Name: ${newUser.name}, Email: ${newUser.email}`);
    return
    
  } catch (error: unknown) {
    if ((error as any).code === 11000) { 
      const errMsg = "Duplicate entry: email already exists (MongoDB error 11000)."
      res.status(409).json({
        success: false,
        message: "Duplicate entry: email already exists.",
        error: 11000
      });
      console.error(errMsg)
      return;
    }
    next(error)
  }
}

// registro de usuario admin ----> auth/admin
const registerAdmin = async (req: Request<{}, {}, registerUserBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  const parseAdminData = RegisterUserSchema.safeParse(req.body);
  if (!parseAdminData.success) {
    const errMsg = "Invalid admin registration data.";
    res.status(400).json({
      success: false,
      message: errMsg,
      error: parseAdminData.error
    });
    console.error(`${errMsg}: `, parseAdminData.error);
    return;
  }

  const { name, email, password } = parseAdminData.data;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const errMsg = "Email is already registered.";
    res.status(409).json({
      success: false,
      message: errMsg
    });
    console.error(errMsg);
    return;
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin" // esto es importante porque modifica el default "user"
    });

    const msg = "Admin user successfully registered.";
    res.status(201).json({
      success: true,
      message: msg,
      data: {
        id: newAdmin._id.toString(),
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });

    console.log(`[ADMIN REGISTERED] ${newAdmin.email}`);
    return;

  } catch (error: unknown) {
    next(error);
  }
};

// login de usuarios
const loginUser = async (req: Request<{}, {}, loginUserBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => { 
  // 1. Validar datos con Zod
  const parseUserLoginData = LoginUserSchema.safeParse(req.body)
  if (!parseUserLoginData.success) { 
    const errMsg = "Invalid login data provided.";
    res.status(400).json({
      success: false,
      message: errMsg,
      error: parseUserLoginData.error
    });
    console.error(`[LOGIN ERROR] ${errMsg}: `, parseUserLoginData.error)
    return;
  }
  const { email, password } = parseUserLoginData.data
  try {
    // 2. Buscar usuario en base de datos
    const existingUser = await User.findOne({ email });
    if (!existingUser) { 
      const errMsg = `User with email "${email}" not found.`
      res.status(401).json({
        success: false,
        message: errMsg,
      });
      console.error(`[LOGIN ERROR] ${errMsg}`)
      return
    }
     // 3. Verificar contraseña
    const isPasswordValid = await bcryptjs.compare(password, existingUser.password)
    if (!isPasswordValid) {
      const errMsg = "Incorrect password"
      res.status(401).json({
        success: false,
        message: errMsg
      });
      console.error(`[LOGIN ERROR] ${errMsg}`);
      return
    }
    // 4. Generar JWT con payload 

    const payload = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role
    }

    const secretKey = process.env.JWT_SECRET
    if (!secretKey) { 
      const errMsg = "Server misconfiguration: JWT secret not set."
      res.status(500).json({
        success: false,
        message: errMsg
    });
      console.error(`[LOGIN ERROR] ${errMsg}`);
      return
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "10m" })
    // 5. Responder con datos relevantes
    const msg = "User logged in successfully."
    res.status(200).json({
      success: true, 
      message: msg,
      token,
      data: {
        id: existingUser._id.toString(),
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role
      }
    })
    console.log(`[LOGIN SUCCESS] ${existingUser.email} logged in.`);
    return
    
  } catch (error: unknown) {
    next(error)
    
  }

}

export { registerUser, loginUser, registerAdmin}