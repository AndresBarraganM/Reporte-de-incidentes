import { sequelize } from '../../utils/database_connection.js'
import { modelo_banos, modelo_edificio, modelo_incidentes } from './ModeloReportes.js'
import { modelo_usuarios } from './ModeloLogin.js'
import { EdificioModel } from './EdificioModel.js';
import { TipoIncidenteModel } from './TipoIncidenteModel.js';
import { BanoModel } from './BanoModel.js';

export class IncidenteModel{

    static async generarIncidente(datos){
        try {
            const edificio = EdificioModel.getEdificio(datos)
            const tipo_incidente = TipoIncidenteModel.getTipoIncidente(datos)
            // const bano = BanoModel.getBano
            if (edificio && tipo_incidente && bano){
            }
        }
        catch(error){
            
        }
    }

    static async obtenerIncidentes() {
        const incidentes = await modelo_incidentes.findAll({
            attributes: ['id_incidente', 'descripcion', 'estado_incidente', 'prioridad', 'fecha_reporte'],
            include: [
                {
                    model: modelo_banos,
                    attributes: ['id_bano', 'id_edificio', 'genero_bano'],
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