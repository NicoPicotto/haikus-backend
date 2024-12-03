import { Request, Response } from "express";
import Budget from "../models/budgetModel";
import BudgetBody from "../interfaces/budgetInterface";

const getAllBudgets = async (req: Request, res: Response) => {
   try {
      const budgets = await Budget.getAllBudgets();
      res.status(200).json(budgets);
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al obtener los presupuestos",
         error: error.message,
      });
   }
};

const addBudget = async (req: Request, res: Response): Promise<void> => {
   const { title, client, project, items, amount, date } = req.body;

   // Validar campos obligatorios
   if (!title || !client || !project || !items || !amount) {
      res.status(400).json({
         error: "Faltan datos obligatorios. Por favor, verificá todos los campos.",
      });
   }

   // Validar formato de `items` (debe ser un array no vacío)
   if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({
         error: "El campo 'items' debe ser un array no vacío.",
      });
   }

   const budgetBody: BudgetBody = {
      title,
      client,
      project,
      items,
      amount,
      date,
   };

   try {
      const newBudget = await Budget.addBudget(budgetBody);
      res.status(201).json(newBudget);
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al agregar el presupuesto",
         error: error.message,
      });
   }
};

const deleteBudget = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const deletedBudget = await Budget.deleteBudget(id);

      res.status(200).json({
         message: "Presupuesto eliminado con éxito",
         deletedBudget,
      });
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al eliminar el presupuesto",
         error: error.message,
      });
   }
};

const updateBudget = async (req: Request, res: Response) => {
   const { id } = req.params;
   const data = req.body;

   try {
      const updatedBudget = await Budget.updateBudget(id, data);
      res.status(200).json({
         message: "Presupuesto actualizado con éxito",
         updatedBudget,
      });
   } catch (error: any) {
      console.error(error);
      res.status(500).json({
         message: "Error al actualizar el presupuesto",
         error: error.message,
      });
   }
};

export { getAllBudgets, addBudget, deleteBudget, updateBudget };
