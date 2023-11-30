import { Router } from "express";
import { User } from "../user/user";
import { createAuthToken } from "./createAuthToken";
import bcrypt from 'bcrypt';
import { ROUNDS } from '../env';

const router = Router();
export const authRouter = router;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send("missing email")
  }
  if (!password) {
    return res.status(400).send("missing password")
  }

  let user = await User.findOne({ where: { email: email } });

  if(!user){
    return res.status(400).send("User doesn't exists.");
  }

  // to-do fix this typing
  const token = createAuthToken((user as any).id);
  return res.json({ user, token });
});

router.post("/signin", async (req, res) => {
  const { username, email, password } = req.body;

  if(!username){
    return res.status(400).send("missing username");
  }
  if (!email) {
    return res.status(400).send("missing email")
  }
  if (!password) {
    return res.status(400).send("missing password")
  }

  let user = await User.findOne({ where: { name: username } });

  if (!user) {
    const encrypted = await bcrypt.hash(password, Number(ROUNDS));

    user = await User.create({
      name: username,
      email: email,
      password: encrypted
    });
    return res.status(201).json({ user });
  }
  return res.status(400).send("user already exists");
})
