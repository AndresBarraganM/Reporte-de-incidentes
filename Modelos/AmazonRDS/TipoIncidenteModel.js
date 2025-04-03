import { modelo_tipo_incidente } from "./ModeloReportes.js";

export class TipoIncidenteModel{
    /**
     * 
     * @param {Incidente} string
     * @description Agrega un tipo de incidente a la base de datos
     * @returns {JSON} deveuelve el resultado agregado
     */
    static async agregarTipoIncidente(){
        const nuevoIncidente = await modelo_tipo_incidente.create()
    }
}