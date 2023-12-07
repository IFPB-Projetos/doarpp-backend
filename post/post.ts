import { STRING, UUID, UUIDV4 } from "sequelize";
import database from "../config/database";
import { User } from "../user/user";

export const Post = database.define("post", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING(80),
    allowNull: false,
  },
  content: {
    allowNull: false,
    type: STRING(10000),
  },
  image: {
    type: STRING,
    allowNull: true,
  },
});

Post.belongsTo(User, { onDelete: "CASCADE" });
User.hasMany(Post, { onDelete: "CASCADE" });
