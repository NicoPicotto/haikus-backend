import { connectDB } from "./config/mongo";
import express from "express";
import budgetRouter from "./routes/budgetRouter";
import authRouter from "./routes/authRouter";
import clientRouter from "./routes/clientRouter";
import cors from "cors";

import { checkJWT } from "./middleware/envMiddleware";

process.loadEnvFile();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use(checkJWT);

connectDB();

app.use("/api/budgets", budgetRouter);
app.use("/api/auth", authRouter);
app.use("/api/clients", clientRouter);

app.listen(PORT, () => {
   console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});
