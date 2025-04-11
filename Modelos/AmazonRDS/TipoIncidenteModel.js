import { modelo_tipo_incidente } from "./database/ModeloReportes.js";

export class TipoIncidenteModel{
    /**
     * 
     * @param {Incidente} string
     * @description Agrega un tipo de incidente a la base de datos
     * @returns {JSON} deveuelve el resultado agregado
     */
    static async agregarTipoIncidente(nombre_incidente){
        try {
            const incidente = await modelo_tipo_incidente.findAll({
                where: {
                    nombre : nombre_incidente.nombre
                }
            })
            if(incidente.length === 0){
                const nuevoIncidente = await modelo_tipo_incidente.create(nombre_incidente)
                return JSON.stringify(nuevoIncidente,null,2)
            }
            else{
                console.log("Ya existe este incidente")
                return false
            }
        }
        catch(error){
            console.error(`Error al agregar el incidente ${error}`)
        }
    }

    static async getAllTipoIncidentes(){
        const incidentes = await modelo_tipo_incidente.findAll()
        return incidentes.dataValues
    }

    static async getTipoIncidente(tipo_incidente){
        try{
            const incidente = await modelo_tipo_incidente.findOne({
                where: {
                    nombre: tipo_incidente
                }
            })
            if(!incidente){
                return null
            }
            return incidente.dataValues
        }
        catch(error){

        }
    }
}

/* TipoIncidenteModel.agregarTipoIncidente({
    nombre: 'Falta de jabón'
}).then((incidente) => {
    console.log(incidente)
}) */

/* TipoIncidenteModel.getAllTipoIncidentes().then((incidentes) => {
    console.log(incidentes)
}) */
    