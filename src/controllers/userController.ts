import { Request, Response } from "express";
import User from "../models/userModel";
import UserBody from '../interfaces/userInterface';

const register = async (req: Request, res: Response) => {
   const { firstName, lastName, email, password } = req.body;

   // Validar campos obligatorios
   if (!firstName || !lastName || !email || !password ) {
      res.status(400).json({
         error: "Faltan datos obligatorios. Por favor, verificá todos los campos.",
      });
   }

   const userBody: UserBody = {
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
         message: "Error al registrar el usuario",
         error: error.message,
      });
   }
};

export {register}
