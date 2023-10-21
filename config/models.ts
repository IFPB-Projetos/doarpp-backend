import { Comment } from "../comment/comment";
import { Post } from "../post/post";
import { User } from "../user/user";

export const models = [User, Post, Comment];

export async function syncModels() {
  for (const model of models) {
    await model.sync();
  }
}
