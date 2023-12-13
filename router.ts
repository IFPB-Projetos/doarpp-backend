import { Router } from "express";
import { authRouter } from "./auth/authRouter";
import { commentRouter } from "./comment/commentRouter";
import { postRouter } from "./post/postRouter";
import { userRouter } from "./user/userRouter";
import { favoriteRouter } from "./favorito/favoritoRouter";

export const router: Router = Router();

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/comments", commentRouter);
router.use("favorite",favoriteRouter);