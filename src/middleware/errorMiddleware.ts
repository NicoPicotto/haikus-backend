import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
   err: any,
   req: Request,
   res: Response,
   next: NextFunction
): void => {
   console.error("test: ", err.stack);

   res.status(500).json({
      message: "Ocurrió un error en el servidor",
      error: err.message,
   });
};

export default errorMiddleware;
