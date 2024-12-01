import { Router } from "express";
import {
   getAllBudgets,
   addBudget,
   deleteBudget,
   updateBudget
} from "../controllers/budgetController";

const budgetRouter = Router();

budgetRouter.get("/", getAllBudgets);
budgetRouter.post("/", addBudget);
budgetRouter.delete("/:id", deleteBudget);
budgetRouter.put("/:id", updateBudget);

export default budgetRouter;
