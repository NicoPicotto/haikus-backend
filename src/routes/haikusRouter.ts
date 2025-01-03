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

haikusRouter.use(authMiddleware);

haikusRouter.get("/", getAllHaikus);
haikusRouter.get("/:id", getHaikuById);
haikusRouter.post("/", addHaiku);
haikusRouter.delete("/:id", deleteHaiku);
haikusRouter.put("/:id", updateHaiku);

export default haikusRouter;
