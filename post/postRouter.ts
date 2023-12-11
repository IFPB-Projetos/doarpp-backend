import { Router } from "express";
import { Comment } from "../comment/comment";
import { Post } from "./post";
import { upload } from "../config/multer";

const router = Router();

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

router.post("/", upload.single('imageUpload'), async (req, res) => {
  const { userId, title, content } = req.body;
  const image = req.file?.filename;

  console.log(image);

  const post = await Post.create({ title, userId, content, image });
  res.status(201).json(post);
});

router.patch("/:id", upload.single('imageUpload'), async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const image = req.file?.filename;

  let post = await Post.findByPk(id);

  // to-do unify 404 errors
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // if (post.dataValues.userId !== userId) {
  //   res.status(403);
  //   throw new Error("unauthorized post patch");
  // }

  const { title, content} = req.body;


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
