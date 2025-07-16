// interface para retorno de objetos en las peticiones HTTP

import { IRegisterUser, IUser } from "./authInterface";
import { IBook } from "./bookInterface";
interface QueryResponse { 
  success: boolean,
  message: string,
  token?:string
  data?: IBook | IBook[] | IRegisterUser | null,
  error?: any
}

export { QueryResponse }
