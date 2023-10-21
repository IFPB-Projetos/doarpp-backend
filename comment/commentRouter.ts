import { Router } from "express";
import { Comment } from "./comment";

const router = Router();
export const commentRouter = router;

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);
  return res.json(comment);
});

router.post("/", async (req, res) => {
  const { userId } = req;
  const { content, postId } = req.body;

  const comment = await Comment.create({ userId, content, postId });
  res.status(201).json(comment);
});

router.patch("/:id", async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  let comment = await Comment.findByPk(id);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (comment.dataValues.userId !== userId) {
    res.status(403);
    throw new Error("unauthorized comment patch");
  }

  const { content } = req.body;
  await comment.update({ content });

  return res.json(comment);
});

router.delete("/:id", async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  let comment = await Comment.findByPk(id);

  if (!comment) {
    return res.status(404).send("Comment not found");
  }

  if (comment.dataValues.userId !== userId) {
    return res.status(403).send("Unauthorized comment delete");
  }

  await Comment.destroy({ where: { id } });

  return res.sendStatus(204);
});
