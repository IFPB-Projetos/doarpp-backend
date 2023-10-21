import { v2 } from "cloudinary";
import { CLOUDINARY_SECRET } from "../env";
import { Upload } from "./upload";

export function validateUpload({ signature, publicId, version }: Upload) {
  const expectedSignature = v2.utils.api_sign_request(
    { public_id: publicId, version },
    CLOUDINARY_SECRET
  );

  if (expectedSignature !== signature) {
    throw new Error("Invalid upload signature");
  }
}
