import { DataSessionInstance } from "twilio/lib/rest/wireless/v1/sim/dataSession.js";
import { modelo_banos, modelo_edificio } from "./database/ModeloReportes.js";

export class BanoModel{
    /**
     * @param {datos} JSON nombre_planta, planta, genero_bano
     * @returns {JSON}
     * @example
     * ModeloBanos.agregarBano({
     * nombre: "300",
     * planta: "alta",
     * genero_bano: "hombre"
     * })
     */
    static async agregarBano(datos){
        try {
            console.log(datos.nombre_edificio, datos.planta, datos.genero_bano)
            const edificio = await modelo_edificio.findOne({
                where: {
                    nombre: datos.nombre_edificio,
                    planta: datos.planta
                }
            })
            if(!edificio){
                console.log("Edificio no encontrado")
                return false
            }

            const bano = await modelo_banos.findOne({
                where: {
                    id_edificio: edificio.id_edificio,
                    genero_bano: datos.genero_bano
                }
            })
            if(!bano){
                const nuevo_bano = await modelo_banos.create({
                    id_edificio: edificio.id_edificio,
                    genero_bano: datos.genero_bano
                })
                console.log("Baño creado correctamente")
                return nuevo_bano
            }
            console.log("Este baño ya está registrado")
            return false
        
        }
        catch(error){
            console.log(`Error al agregar el baño ${error}`)
            throw error
        }
    }

    /**
     * Obtiene los datos de todos los baños regisgtrados, si se ingresan parametros retornará los datos como
     * confirmación de la existencia de este
     * @param {JSON | null} datos 
     * @returns {JSON}
     * @example
     * BanoModel.obtenerBano()
     * O bien
     * BanoModel.obtenerBano({
     * genero_bano: "hombre",
     * nombre: "600",
     * planta: "alta"
     * })
     */
    static async obtenerBano(datos){
        try{
            if(datos){
                const bano = await modelo_banos.findOne({
                    attributes: ['id_bano', 'genero_bano'],
                    include: [{
                        model: modelo_edificio,
                        attributes: ['nombre', 'planta'],
                        where: {
                            nombre: datos.nombre,
                            planta: datos.planta
                        }
                    }],
                    where: {
                        genero_bano: datos.genero_bano
                    }
                })
                if(!bano){
                    return null
                }
                return bano.dataValues
            }
            else{
                const banos = await modelo_banos.findAll({
                    attributes: ['id_bano', 'genero_bano'],
                    include: [{
                        model: modelo_edificio,
                        attributes: ['nombre', 'planta']
                    }]
                })
                return banos.map(bano => {
                    return {
                        id_bano: bano.id_bano,
                        genero_bano: bano.genero_bano,
                        nombre: bano.edificio.nombre,
                        planta: bano.edificio.planta
                    }
                })
            }
        }
        catch(error){
            console.log(`Error al obtener los baños: ${error}`)
        }
        
    }
}