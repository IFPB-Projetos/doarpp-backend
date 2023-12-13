import { UUID, UUIDV4, INTEGER } from "sequelize";
import database from "../config/database";
import { User } from "../user/user";
import { Post } from "../post/post";

export const Favorite = database.define("favorite", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
});

Favorite.belongsTo(User, { onDelete: "CASCADE" });
Favorite.belongsTo(Post, { onDelete: "CASCADE" });

User.hasMany(Favorite, { onDelete: "CASCADE" });
Post.hasMany(Favorite, { onDelete: "CASCADE" });
