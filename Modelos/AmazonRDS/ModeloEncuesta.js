import { DataTypes, INTEGER, Sequelize } from 'sequelize';
import { sequelize } from '../../utils/database_connection.js';
import { modelo_usuarios } from './ModeloUsuarios.js';

const modelo_incidentes = sequelize.define('modelo_incidentes',{
    id_incidente: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    id_usuario_reporte: {
        type: DataTypes.INTEGER(11),
        defaultValue: null,
        allowNull: false,
        references: {
            model: 'modelo_usuarios',
            key: 'id_usuario'
                }
    },
    edificio: {
        type: DataTypes.ENUM('100','200','300','400','500','600','700','centro_informacion', 'gimnacio','auditorio'),
        allowNull: false,
        defaultValue: null,
    },
    planta: {
        type: DataTypes.ENUM('alta','baja'),
        allowNull: false,
        defaultValue: null,
    },
    banio: {
        type: DataTypes.ENUM('hombres','mujeres'),
        allowNull: false,
        defaultValue: null,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: null,
    },
    img: {
        type: DataTypes.BLOB('medium'),
        allowNull: true,
        defaultValue: null,
    },
    fecha_reporte: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
    },
    estado: {
        type: DataTypes.ENUM('pendiente','en_proceso','resuelto'),
        allowNull: true,
        defaultValue: 'pendiente',
    },
    prioridad: {
        type: DataTypes.ENUM('baja','media','alta'),
        allowNull: false,
        defaultValue: null
    }
})
modelo_usuarios.hasMany(modelo_incidentes,{foreignKey: 'id_usuario_reporte'});
modelo_incidentes.belongsTo(modelo_usuarios,{foreignKey: 'id_usuario_reporte'})
export {modelo_incidentes};
