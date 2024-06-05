import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  const isProduction = process.env.NODE_ENV === "production";
  const errorMessage = isProduction ? "Internal Server Error" : err.message;
  const errorDetails = isProduction ? undefined : err.stack;

  res.status(500).json({
    status: "error",
    message: errorMessage,
    ...(errorDetails && { details: errorDetails }),
  });

  next();
};

export default errorHandlerMiddleware;
