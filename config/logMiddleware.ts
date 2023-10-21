import { NextFunction, Request, Response } from "express";

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
  res.on("finish", function (this: Response) {
    console.info(req.method, req.originalUrl, this.statusCode);
  });
  next();
}
