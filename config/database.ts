import { Sequelize } from "sequelize";
import { PG_URI } from "../env";

const database = new Sequelize(PG_URI, {
  define: { timestamps: true },
  logging: false,
});

export default database;
