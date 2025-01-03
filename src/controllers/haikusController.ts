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
         message: "Error al obtener los presupuestos",
         error: error.message,
      });
   }
};

const addHaiku = async (req: Request, res: Response): Promise<void> => {
   const { text, author, date } = req.body;

   // Validar campos obligatorios
   if (text) {
      res.status(400).json({
         error: "Faltan datos obligatorios. Por favor, verificá todos los campos.",
      });
   }

   const haikuBody: HaikuBody = {
      text,
      author,
      date,
   };

   try {
      const newHaiku = await Haiku.addHaiku(haikuBody);
      res.status(201).json(newHaiku);
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al agregar el presupuesto",
         error: error.message,
      });
   }
};

const deleteHaiku = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const deletedHaiku = await Haiku.deleteHaiku(id);

      res.status(200).json({
         message: "Presupuesto eliminado con éxito",
         deletedHaiku,
      });
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al eliminar el presupuesto",
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
         message: "Presupuesto actualizado con éxito",
         updatedHaiku,
      });
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al actualizar el presupuesto",
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
         message: "Error al obtener el presupuesto",
         error: error.message,
      });
   }
};

export { getAllHaikus, addHaiku, deleteHaiku, updateHaiku, getHaikuById };