import { connectDB } from "./config/mongo";
import express from "express";
import budgetRouter from "./routes/budgetRouter";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware";

process.loadEnvFile();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(errorMiddleware);

connectDB();

app.use("/api/budgets", budgetRouter);

app.listen(PORT, () => {
   console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});
