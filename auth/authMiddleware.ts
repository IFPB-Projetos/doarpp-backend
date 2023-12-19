import { NextFunction, Request, Response } from "express";
import { getTokenUserId } from "./getTokenUserId";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  const [, bareToken] = token.split(" ");
  const userId = getTokenUserId(bareToken);
  req.userId = userId;
  return next();
}
