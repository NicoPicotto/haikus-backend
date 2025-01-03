/// <reference path="../custom.d.ts" />

import { Request, Response } from "express";
import Haiku from "../models/haikuModel";
import HaikuBody from "../interfaces/haikuInterface";

const getAllHaikus = async (req: Request, res: Response) => {
   try {
      const haikus = await Haiku.getAllHaikus();
      res.status(200).json(haikus);
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al obtener los haikus",
         error: error.message,
      });
   }
};

const addHaiku = async (req: Request, res: Response): Promise<Response> => {
   const { text } = req.body;

   // Validar campos obligatorios
   if (!text) {
      return res.status(400).json({
         error: "Faltan datos obligatorios. Por favor, verificá todos los campos.",
      });
   }

   // Obtener el author desde req.user
   const user = req.user;
   if (!user) {
      return res.status(401).json({
         error: "Usuario no autenticado",
      });
   }

   const author = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
   };

   const haikuBody: HaikuBody = {
      text,
      author,
      date: new Date(),
   };

   try {
      const newHaiku = await Haiku.addHaiku(haikuBody);
      return res.status(201).json(newHaiku);
   } catch (error: any) {
      console.error(error);
      return res.status(500).json({
         message: "Error al agregar el haiku",
         error: error.message,
      });
   }
};

const deleteHaiku = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const deletedHaiku = await Haiku.deleteHaiku(id);

      res.status(200).json({
         message: "haiku eliminado con éxito",
         deletedHaiku,
      });
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al eliminar el haiku",
         error: error.message,
      });
   }
};

const updateHaiku = async (req: Request, res: Response) => {
   const { id } = req.params;
   const data = req.body;

   try {
      const updatedHaiku = await Haiku.updateHaiku(id, data);
      res.status(200).json({
         message: "haiku actualizado con éxito",
         updatedHaiku,
      });
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al actualizar el haiku",
         error: error.message,
      });
   }
};

const getHaikuById = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const haiku = await Haiku.getHaikuById(id);
      res.status(200).json(haiku);
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al obtener el haiku",
         error: error.message,
      });
   }
};

export { getAllHaikus, addHaiku, deleteHaiku, updateHaiku, getHaikuById };
