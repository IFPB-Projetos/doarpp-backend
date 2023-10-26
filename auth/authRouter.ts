import { Router } from "express";
import { User } from "../user/user";
import { createAuthToken } from "./createAuthToken";
import bcrypt from 'bcrypt';
import { ROUNDS } from '../env';

const router = Router();
export const authRouter = router;

router.post("/login", async (req, res) => {
  const { username, password, accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).send("missing access token on request body");
  }
  if (!username) {
    return res.status(400).send("missing username")
  }
  if (!password) {
    return res.status(400).send("missing password")
  }

  let user = await User.findOne({ where: { name: username } });

  if (!user) {
    res.status(400).send("user don't exists");
  }

  // to-do fix this typing
  const token = createAuthToken((user as any).id);
  return res.json({ user, token });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ where: { name: username } });

  if (!user) {
    const encrypted = await bcrypt.hash(password, Number(ROUNDS));

    user = await User.create({
      name: username,
      password: encrypted
    });
    return res.status(201).json({ user });
  }
  return res.status(400).send("user already exists");
})
