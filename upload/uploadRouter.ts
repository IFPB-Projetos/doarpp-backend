import { Router } from "express";
import "./configureUpload";
import { createSignature } from "./createSignature";

const router = Router();
export const uploadRouter = router;

router.get("/signature", (req, res) => {
  const { timestamp, signature } = createSignature();
  res.json({ timestamp, signature });
});
