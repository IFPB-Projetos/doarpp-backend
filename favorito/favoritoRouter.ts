import { Router } from "express";
import { Favorite } from "./favorito";
import { User } from "../user/user";
import { Post } from "../post/post";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const user = await User.findByPk(userId);
    const post = await Post.findByPk(postId);

    if (!user || !post) {
      return res.status(404).send("Usuario ou post não encontrado");
    }

    const favorite = await Favorite.create({ userId, postId });

    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

router.get("/", async (req, res) => {
  try {
    const favorites = await Favorite.findAll();
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

router.get("/user/:userId", async (req, res) => {
  
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send("Usuario não encontrado");
    }

    const favorites = await Favorite.findAll({
      where: { userId },
    });

    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

router.delete("/:id", async (req, res) => {
  
  try {
    const { id } = req.params;
    const favorite = await Favorite.findOne({
      where: {
        postId: id,
      },
    });

    if (!favorite) {
      return res.status(404).send("Post favoritado não encontrado");
    }

    await favorite.destroy();

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

export const favoriteRouter = router;
