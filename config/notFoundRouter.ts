import { Request, Response } from "express";

export function notFoundRouter(req: Request, res: Response) {
  return res.status(404).send(`route not found ${req.originalUrl}`);
}
