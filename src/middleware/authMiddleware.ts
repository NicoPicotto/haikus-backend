import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Cargar el archivo .env solo en desarrollo
if (process.env.NODE_ENV !== "production" && process.loadEnvFile) {
   process.loadEnvFile();
}

interface DecodedToken {
   id: string;
   email: string;
   firstName: string;
   lastName: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
   const JWT_SECRET = process.env.JWT_SECRET;
   const token = req.headers.authorization?.replace("Bearer ", "");

   if (!token) {
      return res.status(401).json({
         error: "Se requiere estar autenticado para utilizar este servicio",
      });
   }

   try {
      const decodedToken = jwt.verify(token, JWT_SECRET || "") as DecodedToken;
      (req as any).user = decodedToken; // Ahora contiene id, email, firstName, lastName
      next();
   } catch (error) {
      return res.status(401).json({
         error: "No se ha proporcionado un token válido de autenticación",
      });
   }
};

export { authMiddleware };
