import { ClienteEncuesta } from "../models/Encuesta.js";
import { encuestaShema } from "../Schemas/EncuestaSchema.js";

export class ControlerEncuesta {
  // Metodo que retorna un json de preguntas de la encuesta
  static async getEncuesta(req, res) {
    try {
      const encuesta = await ClienteEncuesta.getEncuesta();
      res.status(200).json(encuesta);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async postEncuesta(req, res) {
    //verificar que si se enviaron preguntas
    if (!req.body.data) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    // obtener json y archivo por separado
    let encuesta, foto;
    try {
      encuesta = req.body.data ? JSONparse(req.body.data) : {};

      foto = req.file ? req.file : false;
    } catch (error) {
      res.status(500).json(error);
    }

    // agregar fecha y hora a la encuesta
    encuesta.fechaHora = new Date().toISOString();


    // verificar tamaño de la foto
    if (foto) {
      if (foto.size > 5000000) {
        return res.status(400).json({ message: "La imagen ha de ser menor a 5 mgb" });
      }
    }

    // validar el esquema de la encuesta
    try {
      encuestaShema.parse(encuesta);
    } catch (error) {
      return res.status(400).json({ message: "Error de validación", errors: error.errors });
    }

    // verificar que el banio exista considerando edificio, seccion y genero de este
    if (!ClienteEncuesta.existeBanio(encuesta.edificio, encuesta.seccion, encuesta.genero)) {
      return res.status(400).json({ message: "Error, campo banio no es valido" });
    }


    // guardar la encuesta
    try {
      ClienteEncuesta.addEncuesta(encuesta, foto);
      res.status(200).json({ message: "Encuesta guardada" });
    } catch (error) {
      res.status(500).json(error);
    }
    
  }


}