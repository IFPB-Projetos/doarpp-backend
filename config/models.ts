import { Comment } from "../comment/comment";
import { Post } from "../post/post";
import { User } from "../user/user";
import { Favorite } from "../favorito/favorito";

export const models = [User, Post, Comment , Favorite];

export async function syncModels() {
  for (const model of models) {
    await model.sync();
  }
}
