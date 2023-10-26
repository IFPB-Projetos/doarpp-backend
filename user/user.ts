import { GEOMETRY, STRING, UUID, UUIDV4 } from "sequelize";
import database from "../config/database";

export const User = database.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING(35),
  },
  image: {
    type: STRING,
  },
  email: {
    type: STRING,
    unique: true,
  },
  password: {
    type: STRING,
  },
  description: {
    allowNull: true,
    type: STRING(200),
  },
  phone: {
    type: STRING,
  },
  location: {
    type: GEOMETRY("POINT"),
    allowNull: true,
  },
});
