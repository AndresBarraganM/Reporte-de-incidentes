import { DataTypes, INTEGER, Sequelize } from 'sequelize';
import { sequelize } from '../../utils/database_connection.js';
import { modelo_usuarios } from './ModeloLogin.js';

const modelo_edificio = sequelize.define('modelo_edificio', {
    id_edificio: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100), // 🔹 Corregido 'types' -> 'type'
        allowNull: true,
        unique: true
    },
    planta: {
        type: DataTypes.ENUM('alta', 'baja'), // 🔹 Corregido 'types' -> 'type'
        allowNull: false
    }
}, {
    tableName: 'edificios',
    createdAt: false,
    updatedAt: false
});

const modelo_banos = sequelize.define('modelo_banos', {
    id_bano: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_edificio: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: modelo_edificio,
            key: 'id_edificio'
        }
    },
    planta: {
        type: DataTypes.ENUM('alta', 'baja'), //  Corregido 'types' -> 'type'
        allowNull: false
    },
    tipo_bano: {
        type: DataTypes.ENUM('hombre','mujer'),
        allowNull: false
    }
    
}, {
    tableName: 'banos',
    createdAt: false,
    updatedAt: false
});

//  Corrección de relaciones
modelo_edificio.hasMany(modelo_banos, { foreignKey: 'id_edificio' });
modelo_banos.belongsTo(modelo_edificio, { foreignKey: 'id_edificio' });

const modelo_incidentes = sequelize.define('modelo_incidentes', {
    id_incidente: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id_bano: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: modelo_banos,
            key: 'id_bano'
        }
    },
    id_usuario_reporte: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'modelo_usuarios',
            key: 'id_usuario'
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    img: {
        type: DataTypes.BLOB('medium'),
        allowNull: true
    },
    fecha_reporte: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado_incidente: {
        type: DataTypes.ENUM('pendiente', 'en_proceso', 'resuelto'),
        allowNull: true,
        defaultValue: 'pendiente'
    },
    prioridad: {
        type: DataTypes.ENUM('baja', 'media', 'alta'),
        allowNull: false
    }
}, {
    tableName: 'incidentes',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

// 🔹 Corrección de relaciones
modelo_banos.hasMany(modelo_incidentes, { foreignKey: 'id_bano' });
modelo_incidentes.belongsTo(modelo_banos, { foreignKey: 'id_bano' });

modelo_usuarios.hasMany(modelo_incidentes, {foreignKey: 'id_usuario_reporte'})
modelo_incidentes.belongsTo(modelo_usuarios, {foreignKey: 'id_usuario_reporte'})

export { modelo_incidentes, modelo_banos, modelo_edificio };
