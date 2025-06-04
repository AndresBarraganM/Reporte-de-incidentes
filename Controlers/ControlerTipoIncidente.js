import { validateRequest } from "twilio/lib/webhooks/webhooks.js";
import { TipoIncidenteModel } from "../Modelos/AmazonRDS/TipoIncidenteModel.js";
import { validarTipoIncidenteZod } from "../Schemas/AgregarTipoIncidenteSchema.js";


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

  static async agregarTipoIncidente(req, res){
      try{
        const datos = req.body
        const resultado = await validarTipoIncidenteZod(datos)
                
        try{
          if (!resultado.success) {
            throw new Error("Error de validación", resultado.error.errors);
          }
        } catch {
          res.status(400).json({ message: "Error de validación, la peticion cuenta con campos incorrectos", error: resultado.error.errors });
          return;
        }

        TipoIncidenteModel.agregarTipoIncidente(datos)
        .then((tipoIncidente)=>{
          res.status(200).json({success:true, message: "Tipo de incidente agregado correctamente", tipoIncidente})
        })
        .catch((error)=>{
          res.status(500).json({success: false, message: "error al agregar incidente: ", error})
        })

    }
    catch(error){

    }
  }
}