import { v2 } from "cloudinary";
import { CLOUDINARY_SECRET } from "../env";

export function createSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = v2.utils.api_sign_request({ timestamp }, CLOUDINARY_SECRET);
  return { timestamp, signature };
}
