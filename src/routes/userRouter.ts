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

userRouter.use(authMiddleware);

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", addUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
