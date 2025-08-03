import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  handle: string;
  name: string;
  email: string;
  password: string;
  description: string;
  image: string;
  links: string;
  colorFrom: string;
  colorVia: string;
  colorTo: string;
}

const userSchema = new Schema({
  handle: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  links: {
    type: String,
    default: "[]",
  },
  colorFrom: {
    type: String,
    default: "",
  },
  colorVia: {
    type: String,
    default: "",
  },
  colorTo: {
    type: String,
    default: "",
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
