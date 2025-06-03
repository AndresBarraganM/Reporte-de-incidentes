import { EdificioModel } from "../Modelos/AmazonRDS/EdificioModel.js"; 
import { validarEdificioZod } from "../Schemas/EdificioSchema.js"; // esquema de validacion para banios


export class ControlerEdificio {
  static async getEdificio(req, res) {
    try {
      const edificios = await EdificioModel.getAllEdificios();
      res.status(200).json({"edificios": edificios});
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async agregarEdificio(req, res) {
    try {
      const {nombre, planta} = req.body;

      // Validar el esquema de la encuesta
      const resultado = await validarEdificioZod({nombre: nombre, planta: planta});   

      try{
        if (!resultado.success) {
          throw new Error("Error de validación", resultado.error.errors);
        }
      } catch {
        res.status(400).json({ message: "Error de validación, la peticion cuenta con campos incorrectos", error: resultado.error.errors });
        return;
      }
      

      // crear en la base de datos
      EdificioModel.agregarEdificio({nombre: nombre, planta: planta})
        .then((edificio) => {
          res.status(200).json({ message: "Edificio creado", edificio });
        })
        .catch((error) => {
          res.status(500).json({ message: "Error al crear el banio", error });
        });
      
    } catch (error) {
      res.status(500).json({ message: "Error de validación", errors: error });
    }
  }
}