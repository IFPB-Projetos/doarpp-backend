import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  if (res.statusCode < 400 || res.statusCode >= 600) {
    res.status(500);
  }

  return res.send(error);
}
