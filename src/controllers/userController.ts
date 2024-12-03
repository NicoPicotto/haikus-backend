import { Request, Response } from "express";
import User from "../models/userModel";
import { UserRegisterBody, UserLoginBody } from "../interfaces/userInterface";

const register = async (req: Request, res: Response) => {
   const { firstName, lastName, email, password } = req.body;

   // Validar campos obligatorios
   if (!firstName || !lastName || !email || !password) {
      res.status(400).json({
         error: "Faltan datos obligatorios. Por favor, verificá todos los campos.",
      });
   }

   const userBody: UserRegisterBody = {
      firstName,
      lastName,
      email,
      password,
   };

   try {
      const newUser = await User.register(userBody);
      res.status(201).json(newUser);
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al registrar el usuario controller",
         error: error.message,
      });
   }
};

const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;

   // Validar campos obligatorios
   if (!email || !password) {
      res.status(400).json({
         error: "Faltan datos obligatorios. Por favor, verificá todos los campos.",
      });
   }

   const newUserBody: UserLoginBody = {
      email,
      password,
   };

   try {
      const token = await User.login(newUserBody);
      res.status(200).json({ token });
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al autenticar el usuario",
         error: error.message,
      });
   }
};

export { register, login };
