import { connectDB } from "./config/mongo";
import express from "express";
import haikusRouter from "./routes/haikusRouter";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import cors from "cors";
import { config } from "dotenv";

import { checkJWT } from "./middleware/envMiddleware";

// Cargar .env solo si no estás en producción
if (process.env.NODE_ENV !== "production") {
   config();
}

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use(checkJWT);

connectDB();

app.use("/api/haikus", haikusRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
   console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});

export default app;
