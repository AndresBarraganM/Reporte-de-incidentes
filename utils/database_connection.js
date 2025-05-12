import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargar variables del .env
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'incidentes',
  process.env.DB_USER || 'root',
  (process.env.DB_PASS !== undefined ? process.env.DB_PASS : '1234'),
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    timezone: process.env.DB_TIMEZONE || '-07:00',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    port: parseInt(process.env.DB_PORT) || 3306,
  }
);

export { sequelize };

export async function probarConexion() {
  try {
    await sequelize.authenticate();
    return { exito: true };
  } catch (error) {
    return { exito: false, error: error.message };
  }
}
