import {sequelize} from '../../utils/database_connection.js'
import { modelo_incidentes } from './ModeloEncuesta.js'

export class IncidenteModel{

    static async obtenerModelos(){
        const incidentes = await modelo_incidentes.findAll()
        return JSON.stringify(incidentes, null,1)
    }
}