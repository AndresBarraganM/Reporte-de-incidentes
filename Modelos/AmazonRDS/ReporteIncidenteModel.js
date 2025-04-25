import { modelo_incidentes, modelo_banos, modelo_edificio, modelo_tipo_incidente } from "./ModeloReportes.js";

export class ReporteIncidenteModel{
    // Método para craer un reporte de un incidente
    /**
     * 
     * @param {JSON} reporteIncidente 
     * @returns {boolean} true si se crea el reporte, false si no se crea el reporte
     * @description Se recibe un objeto con los siguientes atributos:
     * - nombre: nombre del edificio
     * - planta: planta del edificio
     * - Tipo_incidente: tipo de incidente
     * - genero_bano: genero del baño
     * - descripcion: descripcion del incidente
     * @example ReporteIncidenteModel.crearReporteIncidente({
     *  "nombre": "Gimnasio",
     *  "planta": "baja",
     *  "Tipo_incidente": "Falta de jabón",
     *  "genero_bano": "mujer",
     *  "img": null | imagen.jpg,
     *  "descripcion": "Falta jabón en ambos dispensadores",
     * })
     */
    static async crearReporteIncidente(reporteIncidente){
        try {
            const edificio = await modelo_edificio.findOne({
                where: {
                    nombre: reporteIncidente.nombre,
                    planta: reporteIncidente.planta
                }
            })
            if (!edificio) {
                console.error("Edificio no encontrado");
                return false;
            }
            const bano = await modelo_banos.findOne({
                where: {
                    id_edificio: edificio.id_edificio,
                    genero_bano: reporteIncidente.genero_bano
                }
            })
            if (!bano) {
                console.error("Baño no encontrado");
                return false;
            }
            const tipoIncidente = await modelo_tipo_incidente.findOne({
                where: {
                    nombre: reporteIncidente.Tipo_incidente
                }
            })
            if (!tipoIncidente) {
                console.error("Tipo de incidente no encontrado");
                return false;
            }
            const nuevoReporte = await modelo_incidentes.create({
                id_bano: bano.id_bano,
                id_incidente: tipoIncidente.id_incidente,
                img : null,
                descripcion: reporteIncidente.descripcion,
                fecha_reporte: new Date(),
            })
            console.log("Reporte creado:", nuevoReporte);r
            return true;
        }
        catch (error) {
            console.error("erroe al crear el reporte", error);
            return false
        }
    
    }
    // Método para obtener todos los reportes de incidentes
    /**
     * 
     * @returns {JSON} todos los reportes de incidentes
     * @description Se obtiene todos los reportes de incidentes
     */
    static async getAllReportesIncidentes(){
        try {
            const reportes = await modelo_incidentes.findAll({
                include: [
                    {
                        model: modelo_banos,
                        include: [
                            {
                                model: modelo_edificio
                            }
                        ]
                    },
                    {
                        model: modelo_tipo_incidente
                    }
                ]
            })
            return JSON.stringify(reportes, null, 2)
        } catch (error) {
            console.error("Error al obtener los reportes", error);
            return false
        }
    }
    // Método para obtener reportes de incidentes por tipo
    /**
     * 
     * @param {JSON} tipoIncidente 
     * @returns {JSON} todos los reportes de incidentes por tipo
     * @description Se obtiene todos los reportes de incidentes por tipo
     *@example ReporteIncidenteModel.getReportesIncidenteByTipo({
     *  "nombre": "Bandalismo"
     * })
     */
    static async getReportesIncidenteByTipo(tipoIncidente){
        try {
            const reportes = await modelo_incidentes.findAll({
                include: [
                    {
                        model: modelo_banos,
                        include: [
                            {
                                model: modelo_edificio
                            }
                        ]
                    },
                    {
                        model: modelo_tipo_incidente,
                        where: {
                            nombre: tipoIncidente.nombre
                        }
                    }
                ]
            })
            if (reportes.length === 0) {
                console.log("No se encontraron reportes para este tipo de incidente");
                return false;
            }
            return JSON.stringify(reportes, null, 2)
        } catch (error) {
            console.error("Error al obtener los reportes", error);
            return false
        }
    }
}