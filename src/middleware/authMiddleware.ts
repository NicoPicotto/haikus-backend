import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
   config();
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
      (req as any).user = decodedToken;
      next();
   } catch (error) {
      return res.status(401).json({
         error: "No se ha proporcionado un token válido de autenticación",
      });
   }
};

export { authMiddleware };
