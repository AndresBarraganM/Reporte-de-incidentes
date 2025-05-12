import { sequelize } from '../../../utils/database_connection.js'
import { DataTypes } from 'sequelize';

// Instancia de la tabla Usuarios
const modelo_usuarios = sequelize.define('usuarios',{
    id_usuario: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: null,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
        defaultValue: null,
    },
    contrasena_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
    },
},
{
    tableName: 'usuarios',
    timestamps: false,
    createdAt: false,
    updatedAt: false
}
)

export { modelo_usuarios }