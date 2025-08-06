import { z } from 'zod'
const RegisterUserSchema =  z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.email("El email ingresado no es válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula.")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número.")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "La contraseña debe contener al menos un carácter especial.")
    .regex(/^\S*$/, "La contraseña no debe contener espacios."),
}).strict()

type registerUserBody = z.infer<typeof RegisterUserSchema>

const LoginUserSchema = z.object({
  email: z.email("Debe ser un email válido"),
  password: z.string().min(1, "La contraseña es obligatoria")
}).strict();

type loginUserBody = z.infer<typeof LoginUserSchema>

export { RegisterUserSchema, registerUserBody, LoginUserSchema, loginUserBody }