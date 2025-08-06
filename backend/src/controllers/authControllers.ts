import { Request, Response, NextFunction } from "express"
import { loginUserBody, LoginUserSchema, registerUserBody, RegisterUserSchema } from "../schemas/authSchema"
import { QueryResponse } from "../types/queryResponse"
import { User } from "../models/authModel"
import { z, ZodError } from 'zod'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


// registro de usuario común ----> POST/auth/ register
const registerUser = async (req: Request<{}, {}, registerUserBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  const parseUserRegisterData = RegisterUserSchema.safeParse(req.body)
  if (!parseUserRegisterData.success) {
  const zodError = parseUserRegisterData.error as ZodError;
  const errMsg = zodError.issues.map(issue => issue.message).join('\n');
    
    res.status(400).json({
      success: false,
      message: errMsg,
      error: parseUserRegisterData.error
    });
    
    return;
  }
  const { name, email, password } = parseUserRegisterData.data
  // Verifico si el email ya está registrado
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

  // Hasheo la contraseña
  const hashedPassword = await bcryptjs.hash(password, 10)
  try {
    // Registro del nuevo usuario
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
    console.log(`[USER REGISTERED] ${newUser.email}`);
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

// registro de usuario admin ----> POST/auth/admin
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
    // Registro con rol "admin"
    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin" 
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

/**
 * Inicio de sesión de usuarios -> POST /auth/login
 */

const loginUser = async (req: Request<{}, {}, loginUserBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => { 
  // Validación de datos con Zod
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
    // Buscar usuario por email
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
    // Verificar contraseña
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

    // Generar token JWT con payload personalizado 
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

    // const token = jwt.sign(payload, secretKey, { expiresIn: "10m" })

    const token = jwt.sign(payload, secretKey)
    
    // Enviar respuesta con token y datos del usuario
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