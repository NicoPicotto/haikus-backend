import { Router } from "express";
import {
   getAllClients,
   addClient,
   deleteClient,
   getClientById,
   updateClient,
} from "../controllers/clientController";
import { authMiddleware } from "../middleware/authMiddleware";

const clientRouter = Router();

clientRouter.use(authMiddleware);

clientRouter.get("/", getAllClients);
clientRouter.get("/:id", getClientById);
clientRouter.post("/", addClient);
clientRouter.delete("/:id", deleteClient);
clientRouter.put("/:id", updateClient);

export default clientRouter;
