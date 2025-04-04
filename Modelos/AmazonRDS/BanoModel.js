import { sequelize } from "../../utils/database_connection.js";
import { modelo_banos, modelo_edificio } from "./ModeloReportes.js";

export class BanoModel{
    /**
     * @param {datos} JSON id_edificio, planta, tipo_bano
     * @returns {JSON}
     */
    static async agregarBano(datos){
        try {
            const bano = await modelo_banos.findAll({
                attributes: ['id_bano', 'genero_bano'],
                include: [{ 
                    model: modelo_edificio,
                    attributes: ['id_edificio','nombre', 'planta'],
                    where: {
                        id_edificio: datos.id_edificio
                    }
                }],
                where: {
                    id_edificio: datos.id_edificio,
                    planta: datos.planta,
                    tipo_bano: datos.tipo_bano
                },
            })
            console.log(JSON.stringify(bano,null,2))
            if(bano.length === 0){
                const create_bano = await modelo_banos.create(datos)
                return JSON.stringify(create_bano,null,2)
            }
            else{
                console.log(`Este baño ya está registrado`)
                return false
            }
        }
        catch(error){
            console.log(`Error al agregar el baño ${error}`)
            throw error
        }
    }

    static async obtenerBano(datos){
        const bano = await modelo_banos.findAll({
            attributes: ['id_bano', 'genero_bano'],
            include: [{
                model: modelo_edificio,
                attributes: ['id_edificio', 'nombre', 'planta'],
                where: {
                    nombre: datos.nombre
                }
            }],
           
        })
        return JSON.stringify(bano, null, 2)
    }
}

BanoModel.obtenerBano({nombre: '300'})
.then((result) => {
    console.log(result)
})