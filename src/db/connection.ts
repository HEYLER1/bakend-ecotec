import { Sequelize, Dialect } from "sequelize";

const DB_NAME = process.env.DB_NAME || "login";
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "";
const DB_HOST = process.env.DB_HOST || "localhost";

const allowedDialects: Dialect[] = ["mysql", "postgres", "sqlite", "mariadb", "mssql"];
const DB_DIALECT = (allowedDialects.includes(process.env.DB_DIALECT as Dialect)
  ? (process.env.DB_DIALECT as Dialect)
  : "mysql");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});

export default sequelize;
