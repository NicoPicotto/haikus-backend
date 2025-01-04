import { Router } from "express";
import {
   getAllUsers,
   getUserById,
   addUser,
   updateUser,
   deleteUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);

userRouter.post("/", addUser, authMiddleware);
userRouter.put("/:id", updateUser, authMiddleware);
userRouter.delete("/:id", deleteUser, authMiddleware);

export default userRouter;
