import { Router } from "express";
import {
   getAllBudgets,
   addBudget,
   deleteBudget,
   updateBudget,
   getBudgetById,
} from "../controllers/budgetController";
import { authMiddleware } from "../middleware/authMiddleware";

const budgetRouter = Router();

budgetRouter.use(authMiddleware);

budgetRouter.get("/", getAllBudgets);
budgetRouter.get("/:id", getBudgetById);
budgetRouter.post("/", addBudget);
budgetRouter.delete("/:id", deleteBudget);
budgetRouter.put("/:id", updateBudget);

export default budgetRouter;
