import { BanoModel } from "../models/BanoModel.js";
import { validarBanio } from "../Schemas/BanoSchema.js"; // esquema de validacion para banios


export class ControlerBano {
  // retornar banios disponibles
  static async getBanios(req, res) {
    try {
      const banios = await ClienteEncuesta.getBanios();
      res.status(200).json(banios);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async postBanio(req, res) {
    try {
      const banio = req.body;

      // Validar el esquema de la encuesta
      const resultado = validarBanio(banio);
      if (!resultado.success) {
        throw new Error("Error de validación", resultado.error.errors);
      }

      // crear en la base de datos
      BanoModel.createBanio(banio)
        .then((banio) => {
          res.status(200).json({ message: "Banio creado", banio });
        })
        .catch((error) => {
          res.status(500).json({ message: "Error al crear el banio", error });
        });
      
    } catch (error) {
      res.status(500).json({ message: "Error de validación", errors: error.errors });
    }
  }
}