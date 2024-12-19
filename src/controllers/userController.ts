import { Request, Response } from "express";
import userModel from "../models/userModel";
import { UserRegisterBody } from "../interfaces/userInterface";

// Obtener todos los usuarios
const getAllUsers = async (req: Request, res: Response) => {
   try {
      const users = await userModel.getAllUsers();
      res.status(200).json(users);
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al obtener los usuarios",
         error: error.message,
      });
   }
};

// Obtener un usuario por ID
const getUserById = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const user = await userModel.getUserById(id);
      if (!user) {
         return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al obtener el usuario",
         error: error.message,
      });
   }
};

// Crear un nuevo usuario (Registro)
const addUser = async (req: Request, res: Response) => {
   const { firstName, lastName, email, password } = req.body;

   // Validar campos obligatorios
   if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
         error: "Faltan datos obligatorios. Por favor, verificá todos los campos.",
      });
   }

   const userBody: UserRegisterBody = { firstName, lastName, email, password };

   try {
      const newUser = await userModel.addUser(userBody);
      res.status(201).json({
         message: "Usuario creado con éxito",
         id: newUser._id,
      });
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al crear el usuario",
         error: error.message,
      });
   }
};

// Actualizar un usuario
const updateUser = async (req: Request, res: Response) => {
   const { id } = req.params;
   const data = req.body;

   if (Object.keys(data).length === 0) {
      return res.status(400).json({
         error: "No se proporcionaron campos válidos para actualizar.",
      });
   }

   try {
      const updatedUser = await userModel.updateUser(id, data);
      if (!updatedUser) {
         return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json({
         message: "Usuario actualizado con éxito",
         updatedUser,
      });
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al actualizar el usuario",
         error: error.message,
      });
   }
};

// Eliminar un usuario
const deleteUser = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const deletedUser = await userModel.deleteUser(id);
      if (!deletedUser) {
         return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json({
         message: "Usuario eliminado con éxito",
         deletedUser,
      });
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al eliminar el usuario",
         error: error.message,
      });
   }
};

export { getAllUsers, getUserById, addUser, updateUser, deleteUser };
