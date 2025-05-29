import { DataTypes } from "sequelize";
import { sequelize } from "../../utils/database_connection.js"; // ruta corregida

const UsuarioTelegram = sequelize.define("usuariostelegram", {
  chat_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "usuariostelegram",
  timestamps: false
});

export default UsuarioTelegram;
