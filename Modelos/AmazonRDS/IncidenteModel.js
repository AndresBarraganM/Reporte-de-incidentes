import { sequelize } from '../../utils/database_connection.js'
import { modelo_banos, modelo_edificio, modelo_incidentes } from './ModeloEncuesta.js'
import { modelo_usuarios } from './ModeloLogin.js'

export class IncidenteModel{

    static async obtenerIncidentes() {
        const incidentes = await modelo_incidentes.findAll({
            attributes: ['id_incidente', 'descripcion', 'estado_incidente', 'prioridad', 'fecha_reporte'],
            include: [
                {
                    model: modelo_banos,
                    attributes: ['id_bano', 'id_edificio', 'tipo_bano'],
                    include: [
                        {
                            model: modelo_edificio,
                            attributes: [['nombre', 'nombre_edificio'], 'planta'] // Alias para cambiar el nombre
                        }
                    ]
                },
            ],
            order: [['fecha_reporte', 'DESC']],
            raw: false, // Devuelve objetos planos en lugar de objetos anidados
        });

        return JSON.stringify(incidentes, null, 2);
    }
}

IncidenteModel.obtenerIncidentes().then((incidentes)=>{
    console.log(incidentes)
})