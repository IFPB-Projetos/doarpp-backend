import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env";
import { TokenPayload } from "./tokenPayload";

export function createAuthToken(userId: number) {
  if (!JWT_SECRET) {
    throw new Error("Missing env variable JWT_SECRET");
  }
  const payload: TokenPayload = { userId };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
