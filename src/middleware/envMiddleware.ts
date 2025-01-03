import { Request, Response, NextFunction } from "express";

// Cargar el archivo .env solo en desarrollo
if (process.env.NODE_ENV !== "production" && process.loadEnvFile) {
   process.loadEnvFile();
}

const checkJWT = (req: Request, res: Response, next: NextFunction) => {
   const JWT_SECRET = process.env.JWT_SECRET;
   if (!JWT_SECRET) {
      res.status(400).json({
         error: "Falta la variable de entorno JWT_SECRET",
      });
   }
   next();
};

export { checkJWT };
