import { STRING, UUID, UUIDV4 } from "sequelize";
import database from "../config/database";
import { Post } from "../post/post";
import { User } from "../user/user";

export const Comment = database.define("comment", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  content: {
    allowNull: false,
    type: STRING(2000),
  },
});

Comment.belongsTo(User);
Comment.belongsTo(Post);
User.hasMany(Comment, { onDelete: "CASCADE" });
Post.hasMany(Comment, { onDelete: "CASCADE" });
