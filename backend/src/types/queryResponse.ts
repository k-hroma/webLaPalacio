// interface para retorno de objetos en las peticiones HTTP

import { IBook } from "./bookInterface";
interface QueryResponse { 
  success: boolean,
  message: string,
  data?: IBook | IBook[] | null,
  error?: any
}

export {QueryResponse }