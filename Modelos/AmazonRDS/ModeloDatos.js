import { sequelize } from '../../utils/database_connection.js'
import { DataTypes } from 'sequelize'
import { modelo_incidentes } from './ModeloIncidentes.js';
import { modelo_usuarios } from './ModeloUsuarios.js';

const modelo_notificaciones = sequelize.define('notificaciones',{
    id_notificacion: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_incidente: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: modelo_incidentes,
            key: 'id_reporte'
        },
    },
    id_usuario: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: modelo_usuarios,
            key: 'id_usuario'
        },
    },
    tipo_notificacion: {
        type: DataTypes.ENUM('SMS','email'),
        allowNull: false,
        defaultValue: null,
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: null,
    },
    fecha_envio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
    },
},{
    tableName: 'notificaciones',
    createdAt: false,
    updatedAt: false
})

modelo_usuarios.hasMany(modelo_notificaciones,{foreignKey:'id_usuario'})
modelo_notificaciones.belongsTo(modelo_usuarios,{foreignKey:'id_usuario'}) 

modelo_incidentes.hasMany(modelo_notificaciones,{foreignKey:'id_reporte'})
modelo_notificaciones.belongsTo(modelo_incidentes,{foreignKey:'id_reporte'})


export { modelo_notificaciones }