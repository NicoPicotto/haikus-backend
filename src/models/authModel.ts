import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRegisterBody, UserLoginBody } from "../interfaces/authInterface";

process.loadEnvFile();
const JWT_SECRET: string = process.env.JWT_SECRET || "";

const userSchema = new mongoose.Schema(
   {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
   },
   { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);

const register = async (data: UserRegisterBody) => {
   try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = new User({
         firstName: data.firstName,
         lastName: data.lastName,
         email: data.email,
         password: hashedPassword,
      });
      await newUser.save();
      return newUser;
   } catch (error) {
      throw new Error("Error al registrar usuario model");
   }
};

const login = async (data: UserLoginBody) => {
   try {
      const user = await User.findOne({ email: data.email });
      if (!user) {
         throw new Error("Usuario no encontrado");
      }
      const isPasswordCorrect = await bcrypt.compare(
         data.password,
         user.password
      );
      if (!isPasswordCorrect) {
         throw new Error("Credenciales inválidas");
      }
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
         expiresIn: "2h",
      });
      return { token };
   } catch (error) {
      throw new Error("Error al autenticar usuario");
   }
};

export default { register, login };
