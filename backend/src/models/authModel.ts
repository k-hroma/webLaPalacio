import { Schema, model } from "mongoose";
import { IUser } from "../types/authInterface";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
}, {versionKey:false, timestamps:true});

const User = model<IUser>("User", userSchema)

export { User }