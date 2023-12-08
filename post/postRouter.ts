import { Router } from "express";
import { Comment } from "../comment/comment";
import { validateUpload } from "../upload/validateUpload";
import { Post } from "./post";
import {randomBytes} from "node:crypto";
import multer from "multer";

const router = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "public/imgs");
    },
    filename: function (req, file, callback) {
      const fileName = `${randomBytes(16).toString('hex')}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
})

router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    order: [["createdAt", "DESC"]],
  });
  return res.json(posts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id, {
    include: [
      "user",
      {
        model: Comment,
        include: ["user"],
      },
    ],
  });
  return res.json(post?.toJSON());
});

<<<<<<< HEAD
router.post("/", upload.single('image'), async (req, res) => {
  const { userId } = req.body;
=======
router.post("/", async (req, res) => {
  const { userId } = req;
>>>>>>> parent of 1ff8f96 (Mudando post)
  const { title, content, imageUpload } = req.body;

  validateUpload(imageUpload);
  const image = imageUpload.publicId;

  const post = await Post.create({ title, userId, content, image });
  res.status(201).json(post);
});

router.patch("/:id", async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  let post = await Post.findByPk(id);

  // to-do unify 404 errors
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.dataValues.userId !== userId) {
    res.status(403);
    throw new Error("unauthorized post patch");
  }

  const { title, content, imageUpload } = req.body;

  let image = undefined;
  if (imageUpload) {
    validateUpload(imageUpload);
    image = imageUpload.publicId;
  }

  await post.update({ title, content, image });

  res.json(post);
});

router.delete("/:id", async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  let post = await Post.findByPk(id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  if (post.dataValues.userId !== userId) {
    return res.status(403).send("Unauthorized post delete");
  }

  await Post.destroy({ where: { id } });

  return res.sendStatus(204);
});

export const postRouter = router;
