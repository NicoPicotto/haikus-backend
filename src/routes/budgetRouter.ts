import { Router } from "express";
import { getAllBudgets, addBudget } from "../controllers/budgetController";

const budgetRouter = Router();

budgetRouter.get("/", getAllBudgets);
budgetRouter.post("/", addBudget);

export default budgetRouter;