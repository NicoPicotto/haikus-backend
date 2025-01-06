/// <reference path="../custom.d.ts" />

import { Request, Response } from "express";
import HaikuBody from "../interfaces/haikuInterface";
import Haiku from "../models/haikuModel";

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
      id: user.id,
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

const getHaikusByUser = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const haikus = await Haiku.getHaikusByUser(id);
      res.status(200).json(haikus);
   } catch (error: any) {
      console.error("Error al obtener los Haikus por usuario:", error);
      res.status(500).json({
         message: "Error al obtener los Haikus del usuario",
         error: error.message,
      });
   }
};

const getHaikuOfTheDay = async (req: Request, res: Response) => {
   try {
      const haiku = await Haiku.getHaikuOfTheDay(); // Llamada correcta al modelo
      res.status(200).json(haiku);
   } catch (error: any) {
      console.error("Error al obtener el Haiku del día (Controlador):", error);
      res.status(500).json({
         message: "Error al obtener el Haiku del día",
         error: error.message,
      });
   }
};

const toggleSaveHaiku = async (req: Request, res: Response) => {
   const userId = req.user?.id; // Obtener el ID del usuario autenticado
   const { id: haikuId } = req.params; // ID del Haiku a guardar/desguardar

   if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
   }

   try {
      // Llamada al modelo para guardar o desguardar el Haiku
      const result = await Haiku.toggleSaveHaiku(userId, haikuId);

      res.status(200).json({
         message: result.isSaved
            ? "Haiku guardado con éxito"
            : "Haiku eliminado de guardados",
         haikuId,
         isSaved: result.isSaved,
      });
   } catch (error: any) {
      console.error("Error al guardar/desguardar el Haiku:", error);
      res.status(500).json({
         message: "Error al guardar/desguardar el Haiku",
         error: error.message,
      });
   }
};

const toggleLike = async (req: Request, res: Response) => {
   const userId = req.user?.id; // ID del usuario autenticado
   const { id: haikuId } = req.params; // ID del Haiku

   if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
   }

   try {
      // Llamar a la función del modelo para manejar el like
      const result = await Haiku.toggleLikeHaiku(haikuId, userId);

      res.status(200).json({
         message: result.liked
            ? "Haiku likedeado con éxito"
            : "Like eliminado del Haiku",
         likesCount: result.likesCount,
         liked: result.liked,
      });
   } catch (error: any) {
      console.error("Error al togglear el like del Haiku:", error.message);
      res.status(500).json({
         message: "Error al togglear el like del Haiku",
         error: error.message,
      });
   }
};

export {
   getAllHaikus,
   addHaiku,
   deleteHaiku,
   updateHaiku,
   getHaikuById,
   getHaikusByUser,
   getHaikuOfTheDay,
   toggleSaveHaiku,
   toggleLike,
};
