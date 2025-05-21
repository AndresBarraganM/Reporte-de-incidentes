import { modelo_banos, modelo_edificio, modelo_incidentes, modelo_tipo_incidente } from './database/ModeloReportes.js'
import { BanoModel } from './BanoModel.js';
import { Op } from 'sequelize';

export class IncidenteModel{

    static async generarIncidente(datos) {
        try {
            // Buscar con await
            const bano = await BanoModel.obtenerBano({
                nombre: datos.nombre,
                planta: datos.planta,
                genero_bano: datos.genero_bano
            });
            const tipo_incidente = await modelo_tipo_incidente.getTipoIncidente(datos.tipo_incidente);
    
            // Validar existencia
            if (!bano || !tipo_incidente) {
                throw new Error("Recursos no encontrados para crear el incidente");
            }
    
            // Crear incidente con todos los campos requeridos
            const nuevo_incidente = await modelo_incidentes.create({
                id_bano: bano.id_bano,
                id_incidente: tipo_incidente.id_incidente,
                img: datos.img ? datos.img : null,  // Campo opcionals
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
            attributes: ['id_incidente', 'id_reporte', 'descripcion', 'estado', 'prioridad', 'fecha_reporte'],
            where: whereIncidente,
            include: [
                {
                    model: modelo_tipo_incidente,
                    attributes: ['id_incidente', 'nombre'],
                },
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
            id_reporte: incidente.id_reporte,
            incidente: {
                id_incidente: incidente.id_incidente,
                nombre: incidente.tipo_incidente.nombre
            },
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

    static async obtenerFotoIncidente(id_reporte) {
        try {
            const incidente = await modelo_incidentes.findOne({
                where: { id_reporte },
                attributes: ['img']
            });
    
            if (!incidente) {
                throw new Error("Incidente no encontrado");
            }
    
            return incidente.img;
        } catch (error) {
            console.error(`Error al obtener la foto del incidente: ${error.message}`);
            throw error; // Propagar el error para manejo superior
        }
    }

    static async actualizarEstado(id_reporte, nuevoEstado) {
    try {
        const resultado = await modelo_incidentes.update(
            { estado: nuevoEstado },
            { where: { id_reporte } }
        );
        return resultado;
    } catch (error) {
        throw new Error("Error al actualizar el estado del incidente: " + error.message);
    }
}

}

IncidenteModel.obtenerIncidentes({}).then((result) => {
    console.log(result);
})
