import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
   res.send("¡Hola, mundo!");
});

app.listen(port, () => {
   console.log(`Servidor corriendo en http://localhost:${port}`);
});
