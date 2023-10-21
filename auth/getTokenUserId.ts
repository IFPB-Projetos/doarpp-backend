import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../env";
import { TokenPayload } from "./tokenPayload";

export function getTokenUserId(token: string) {
  try {
    const payload = verify(token, JWT_SECRET, { maxAge: "7d" }) as TokenPayload;
    return payload.userId;
  } catch (error) {
    return undefined;
  }
}
