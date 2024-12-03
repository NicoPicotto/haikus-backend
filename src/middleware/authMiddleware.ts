import { Request, Response, NextFunction } from "express";
import jtw from "jsonwebtoken";

process.loadEnvFile();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
   const JWT_SECRET = process.env.JWT_SECRET;
   const token = req.headers.authorization?.replace("Bearer ", "");

   if (!token) {
      res.status(401).json({
         error: "Se requiere estar autenticado para utilizar este servicio",
      });
      return;
   }

   try {
      const decodedToken = jtw.verify(token, JWT_SECRET || "");
      (req as any).user = decodedToken;
      next();
   } catch (error) {
      res.status(401).json({
         error: "No se ha proporcionado el token de autenticación",
      });
   }
};

export { authMiddleware };
