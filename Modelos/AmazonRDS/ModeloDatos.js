import { sequelize } from '../../utils/database_connection.js'
import { DataTypes } from 'sequelize'
import { modelo_incidentes } from './ModeloIncidentes.js';
import { modelo_usuarios } from './ModeloUsuarios.js';

const modelo_historial_incidentes = sequelize.define('historial_incidentes',{
    id_historial: {
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
            key: 'id_incidente'
        },
    },
    id_usuario_responsable: {
        type: datatyes.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
            model: modelo_usuarios,
            key: 'id_usuario'
        },
    },
    accion: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    }
})
modelo_usuarios.hasMany(modelo_historial_incidentes,{foreignKey:'id_usuario_responsable'})
modelo_historial_incidentes.belongsTo(modelo_usuarios,{foreignKey:'id_usuario_responsable'})

modelo_incidentes.hasMany(modelo_historial_incidentes,{foreignKey:'id_incidente'})
modelo_historial_incidentes.belongsTo(modelo_incidentes,{foreignKey:'id_incidente'})


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
        type: DataTypes.ENUM('SMS','email','app'),
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
    estado: {
        type: DataTypes.ENUM('pendiente','enviado','fallido'),
        allowNull: false,
        defaultValue: null,
    },
})

modelo_usuarios.hasMany(modelo_notificaciones,{foreignKey:'id_usuario'})
modelo_notificaciones.belongsTo(modelo_usuarios,{foreignKey:'id_usuario'}) 

modelo_incidentes.hasMany(modelo_notificaciones,{foreignKey:'id_reporte'})
modelo_notificaciones.belongsTo(modelo_incidentes,{foreignKey:'id_reporte'})


export { modelo_historial_incidentes }