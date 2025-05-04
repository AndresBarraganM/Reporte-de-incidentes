import { modelo_banos, modelo_edificio, modelo_incidentes } from './database/ModeloReportes.js'
import { EdificioModel } from './EdificioModel.js';
import { TipoIncidenteModel } from './TipoIncidenteModel.js';
import { BanoModel } from './BanoModel.js';
import { Op } from 'sequelize';

export class IncidenteModel{

    static async generarIncidente(datos) {
        try {
            console.log(JSON.stringify(datos, null, 2));
            
            // Buscar con await
            const bano = await BanoModel.obtenerBano({
                nombre: datos.nombre,
                planta: datos.planta,
                genero_bano: datos.genero_bano
            });
            const tipo_incidente = await TipoIncidenteModel.getTipoIncidente(datos.tipo_incidente);
    
            // Validar existencia
            if (!bano || !tipo_incidente) {
                throw new Error("Recursos no encontrados para crear el incidente");
            }
    
            // Crear incidente con todos los campos requeridos
            const nuevo_incidente = await modelo_incidentes.create({
                id_bano: bano.id_bano,
                id_incidente: tipo_incidente.id_incidente,
                descripcion: datos.descripcion,
                fecha_reporte: new Date()  // Campo obligatorio
            });
    
            return nuevo_incidente;
            
        } catch (error) {
            console.error(`Error al crear el incidente: ${error.message}`);
            throw error; // Propagar el error para manejo superior
        }
    }

    static async obtenerIncidentes(filtros = {}) {
        // Incialización de las variables del búsqueda
        const  {edificio, banio, planta, estado, prioridad, fecha} = filtros;

        // inicialización de las variables de busqueda (Where)
        const whereEdificio = {};
        const whereBano = {};
        const whereIncidente = {};

        if (edificio) whereEdificio.nombre = edificio;
        if (planta) whereEdificio.planta = planta;
        if (banio) whereBano.genero_bano = banio;
        if (estado) whereIncidente.estado = estado;
        if (prioridad) whereIncidente.prioridad = prioridad;
        if (fecha) {
            whereIncidente.fecha_reporte = {};
            if (filtros.fecha.antesDe) whereIncidente.fecha_reporte = { [Op.lt]: filtros.fecha.antesDe };
            if (filtros.fecha.despuesDe) whereIncidente.fecha_reporte = { [Op.gt]: filtros.fecha.despuesDe };
        }

        //
        const incidentes = await modelo_incidentes.findAll({
            attributes: ['id_incidente', 'descripcion', 'estado', 'prioridad', 'fecha_reporte'],
            where: whereIncidente,
            include: [
                {
                    model: modelo_banos,
                    attributes: ['id_bano', 'genero_bano'],
                    include: [
                        {
                            model: modelo_edificio,
                            attributes: ['id_edificio','nombre', 'planta'],
                            where: whereEdificio
                        }
                    ],
                    where: whereBano
                },
            ],
            
            order: [['fecha_reporte', 'DESC']],
        });
    
        return incidentes.map(incidente => ({
            id_incidente: incidente.id_incidente,
            descripcion: incidente.descripcion,
            estado: incidente.estado,
            prioridad: incidente.prioridad,
            fecha_reporte: incidente.fecha_reporte,
            bano: {
                id_bano: incidente.bano.id_bano,
                genero: incidente.bano.genero_bano,
                edificio: {
                    id_edificio: incidente.bano.edificio.id_edificio,
                    nombre: incidente.bano.edificio.nombre,
                    planta: incidente.bano.edificio.planta
                }
            }
        }));
    }
}