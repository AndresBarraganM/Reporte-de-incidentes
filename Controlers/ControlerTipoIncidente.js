import { TipoIncidenteModel } from "../Modelos/AmazonRDS/TipoIncidenteModel.js";


export class ControlerTipoIncidente{

  static async getTipoIncidentes(req, res){
    // obtener todos los incidentes
    let datos = {}
    try {
      datos = await TipoIncidenteModel.getAllTipoIncidentes()
    } catch (error) {
      res.status(500).json(error)
    }

    res.status(200).json(datos) 
  }
}