interface IUser { 
  name: string,
  email: string,
  password: string,
  role: "admin" | "user";
}

interface IRegisterUser { 
  id: string, 
  name: string,
  email: string,
  role: "admin" | "user"

}

export { IUser, IRegisterUser }