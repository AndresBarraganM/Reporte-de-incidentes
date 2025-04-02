import {modelo_incidentes} from  './ModeloEncuesta.js'
import {getDateTime} from '../../utils/functions/time.js'

export class ReporteModel{
    /**
     * 
     * @param {datos} JSON los datos del reporte en formato JSON id_usuario_reporte, edificio, planta, baño, descripcion, img, fecha_reporte, estado, prioridad
     * @returns {JSON} el reporte creado en formato JSON
     */
    static async createReporte(datos){
        const reporte = await modelo_incidentes.create(datos)
        return JSON.stringify(reporte, null, 2)
    }
    /**
     * @param {any} any No require parametros de entrada
     * @returns {JSON} todos los reportes en formato JSON
     * @description obtiene todos los reportes de la base de datos
     */
    static async getReportes(){
        const reportes = await modelo_incidentes.findAll()
        return JSON.stringify(reportes, null, 2)
    }

    /**
     * 
     * @param {'baja'|'alta'} planta  
     * @returns {JSON} reportes de la planta especificada
     * @description obtiene todos los reportes de la base de datos por planta
     * @example ReporteModel.getReportebyPlanta('alta')
     */
    static async getReportebyPlanta(planta){
        const reportes = await modelo_incidentes.findAll({
            where: {
                planta: planta
            }
        })
        return JSON.stringify(reportes, null, 2)
    }

}

/* ReporteModel.createReporte({
    id_usuario_reporte: 5,
    edificio: '300',
    planta: 'alta',
    banio: 'mujeres',
    descripcion: 'Fuga de agua en el baño de mujeres',
    img: 10110110101,
    fecha_reporte: await getDateTime(),
    estado: 'pendiente',
    prioridad: 'media'
}).then((reporte)=> {
    console.log('Reporte creado:', reporte)

}) */

/* ReporteModel.getReportes().then((reportes)=> {
    console.log('Reportes:', reportes)
}) */

ReporteModel.getReportebyPlanta('alta').then((reportes)=> {
    console.log('Reportes por planta:', reportes)
})