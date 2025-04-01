import { sequelize } from '../../utils/database_connection.js'
import { DataTypes } from 'sequelize';

// Asignación del modelo del usuario
const modelo_usuarios = sequelize.define('modelo_usuarios',{
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
    rol: {
        type: DataTypes.ENUM('administrador','encargado_limpieza'),
        allowNull: false,
        defaultValue: null,
    },
    contrasenia: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
    }
})

export { modelo_usuarios }