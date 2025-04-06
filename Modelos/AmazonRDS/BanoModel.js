import { DataSessionInstance } from "twilio/lib/rest/wireless/v1/sim/dataSession.js";
import { sequelize } from "../../utils/database_connection.js";
import { modelo_banos, modelo_edificio } from "./ModeloReportes.js";

export class BanoModel{
    /**
     * @param {datos} JSON nombre_planta, planta, tipo_bano
     * @returns {JSON}
     * @example
     * ModeloBanos.agregarBano({
     * 
     * })
     */
    static async agregarBano(datos){
        try {
            console.log(datos.nombre_edificio, datos.planta, datos.tipo_bano)
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
                    tipo_bano: datos.tipo_bano
                }
            })
            if(!bano){
                const nuevo_bano = await modelo_banos.create({
                    id_edificio: edificio.id_edificio,
                    tipo_bano: datos.tipo_bano
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

    static async obtenerBano(datos){
        const bano = await modelo_banos.findAll({
            attributes: ['id_bano', 'tipo_bano'],
            include: [{
                model: modelo_edificio,
                attributes: ['nombre', 'planta'],
                where: {
                    nombre: datos.nombre,
                    planta: datos.planta
                }
            }],
            where: {
                tipo_bano: datos.tipo_bano
            }
           
        })
        return JSON.stringify(bano, null, 2)
    }
}

<<<<<<< HEAD
/*
BanoModel.obtenerBano({nombre: '300'})
.then((result) => {
    console.log(result)
})
*/
=======

BanoModel.obtenerBano({
    nombre: '300',
    tipo_bano: 'hombre',
    planta: 'baja'
}).then((banos) =>{
    console.log(banos)
})
>>>>>>> ca013735e3a29695b425e004cdd6a24e75af2058
