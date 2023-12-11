import { Router } from "express";
import { phone as validatePhone } from "phone";
import { User } from "./user";
import { upload } from "../config/multer";

const router = Router();

// the order matters
router.get("/me", async (req, res) => {
  const { userId } = req;
  const user = await User.findByPk(userId);
  return res.json(user);
});

router.get("/:userName", async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({where: {username: userName}, include: "posts" });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  return res.json(user.toJSON());
});

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.delete("/me", async (req, res) => {
  const { userId } = req;
  const user = await User.findByPk(userId);
  await user?.destroy();
  return res.sendStatus(204);
});

router.patch("/me/location", async (req, res) => {
  const { latitude, longitude } = req.body;

  const location = {
    type: "Point",
    coordinates: [longitude, latitude],
  };

  const user = await User.findByPk(req.userId, { include: "posts" });

  if (!user) {
    return res.status(404).send("user not found");
  }

  user.update({ location });
  return res.json(user);
});

router.patch("/me", upload.single("imageUpload"), async (req, res) => {
  const { userId } = req.body;

  let user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).send("user not found");
  }

  const { name, description, phone } = req.body;

  let image = req.file?.filename;

  if (phone) {
    const { isValid } = validatePhone(phone);

    if (!isValid) {
      return res.status(400).send("Invalid phone number");
    }
  }

  await user.update({ name, description, image, phone });

  res.json(user);
});

export const userRouter = router;
