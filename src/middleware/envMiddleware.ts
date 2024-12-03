import { Request, Response, NextFunction } from "express";

const checkJWT = (req: Request, res: Response, next: NextFunction) => {
   process.loadEnvFile();
   const JWT_SECRET = process.env.JWT_SECRET;
   if (!JWT_SECRET) {
      res.status(400).json({
         error: "Falta la variable de entorno JWT_SECRET",
      });
   }
   next();
};

export { checkJWT };
