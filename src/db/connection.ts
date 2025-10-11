import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables del .env

const sequelize = new Sequelize(
  process.env.DB_NAME || "userpost",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Conectado exitosamente papicha"))
  .catch((err) => console.error("error ps", err));

export default sequelize;
