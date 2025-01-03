import { Router } from "express";
import {
   getAllHaikus,
   addHaiku,
   deleteHaiku,
   updateHaiku,
   getHaikuById,
} from "../controllers/haikusController";
import { authMiddleware } from "../middleware/authMiddleware";

const haikusRouter = Router();

// Rutas públicas (no requieren autenticación)
haikusRouter.get("/", getAllHaikus);
haikusRouter.get("/:id", getHaikuById);

// Rutas protegidas (requieren autenticación)
haikusRouter.post("/", authMiddleware, addHaiku);
haikusRouter.delete("/:id", authMiddleware, deleteHaiku);
haikusRouter.put("/:id", authMiddleware, updateHaiku);

export default haikusRouter;
