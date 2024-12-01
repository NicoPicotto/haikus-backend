import { Request, Response, NextFunction } from "express";
import Budget from "../models/budgetModel";

const getAllBudgets = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const budgets = await Budget.getAllBudgets();
      res.status(200).json(budgets);
   } catch (error) {
      next(error);
   }
};

const addBudget = async (req: Request, res: Response, next: NextFunction) => {
   const { title, client, project, items, amount, date } = req.body;
   try {
      const newBudget = await Budget.addBudget({
         title,
         client,
         project,
         items,
         amount,
         date,
      });
      res.status(201).json(newBudget);
   } catch (error) {
      next(error);
   }
};

export { getAllBudgets, addBudget };
