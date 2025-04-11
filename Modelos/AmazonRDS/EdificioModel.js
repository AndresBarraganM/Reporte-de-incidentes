import { modelo_edificio } from "./database/ModeloReportes.js";

export class EdificioModel{
    /**
     * 
     * @param {datos} JSON se debe ingresar el nombre del edificio
     * @returns {JSON} la confirmación del registro
     * @example EdificioModel.agregarEdificio({nombre: 'Gimnacio'})
     */
    static async agregarEdificio(datos){
        try {
            const edificio = await modelo_edificio.findOne({
                where: {
                    nombre : datos.nombre,
                    planta: datos.planta
                }
            })
            if(!edificio){
                const nuevo_edificio = await modelo_edificio.create(datos)
                console.log("Edificio Agregado Correctamente")
                return JSON.stringify(nuevo_edificio, null, 2)
            }
            else{
                console.log("Ya existe este edificio")
                return false
            }
        }
        catch(error){
            console.error(`Error al agregar el edificios ${error}`)
            return false
        }
    }
    
    /**
     * 
     * @returns {JSON}
     * @description Obtiene todos los edificios ordenados por nombre
     */

    static async getEdificio(datos){
        try{
            const edificio = await modelo_edificio.findOne({
                where: {
                    nombre: datos.nombre,
                    planta: datos.planta
                }
            })
            return edificio.dataValues

        }
        catch(error){

        }
    }
    static async getAllEdificios(){
        try{
            const edificios = await modelo_edificio.findAll({
                order: [
                    ['nombre', 'ASC']
                ]
            })
            return JSON.stringify(edificios,null,1)
        }
        catch(error){
            console.error(`Error al obtener los edificios ${error}`)
            return false
        }
    }
}