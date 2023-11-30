import { config } from "dotenv";
config();

export const {
  PORT = "8080",
  PG_URI,
  JWT_SECRET,
  ROUNDS = 12
} = process.env as { [key: string]: string | number };

const required = {
  PG_URI,
  JWT_SECRET,
  ROUNDS
};

for (let key in required) {
  if (!required[key as keyof typeof required]) {
    throw new Error("Missing required env variable " + key);
  }
}
