import { config } from "dotenv";
config();

export const {
  PORT = "8080",
  PG_URI,
  JWT_SECRET,
  CLOUDINARY_SECRET,
  CLOUDINARY_NAME = "dlwoimstk",
  CLOUDINARY_API_KEY = "378278351497316",
} = process.env as { [key: string]: string };

const required = {
  PG_URI,
  JWT_SECRET,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
  CLOUDINARY_API_KEY,
};

for (let key in required) {
  if (!required[key as keyof typeof required]) {
    throw new Error("Missing required env variable " + key);
  }
}
