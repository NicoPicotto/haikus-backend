import { Router } from "express";
import {
   getAllHaikus,
   addHaiku,
   deleteHaiku,
   updateHaiku,
   getHaikuById,
   getHaikusByUser,
   getHaikuOfTheDay,
   toggleSaveHaiku,
} from "../controllers/haikusController";
import { getSavedHaikus } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const haikusRouter = Router();

// Rutas públicas (no requieren autenticación)

haikusRouter.get("/", getAllHaikus);
haikusRouter.get("/daily", getHaikuOfTheDay);
haikusRouter.get("/saved", authMiddleware, getSavedHaikus);
haikusRouter.get("/:id", getHaikuById);
haikusRouter.get("/user/:id", getHaikusByUser);

// Rutas protegidas (requieren autenticación)
haikusRouter.post("/", authMiddleware, addHaiku);
haikusRouter.delete("/:id", authMiddleware, deleteHaiku);
haikusRouter.put("/:id", authMiddleware, updateHaiku);

haikusRouter.patch("/save/:id", authMiddleware, toggleSaveHaiku);

export default haikusRouter;
