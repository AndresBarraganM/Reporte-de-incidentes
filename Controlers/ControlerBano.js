import { BanoModel } from "../Modelos/AmazonRDS/BanoModel.js"; 
import { validarBanoZod } from "../Schemas/BanoSchema.js"; // esquema de validacion para banios
import { separarUbicacion } from "../utils/functions/separarUbicacion.js"; // utilidades para separar ubicacion


export class ControlerBano {
  static async getBanos(req, res) {
    try {
      const banios = await BanoModel.obtenerBano();
      
      // Modificar el array para unir nombre y planta
      const baniosModificados = banios.map(bano => ({
        ...bano,  // Mantener todas las propiedades originales
        ubicacion: `${bano.nombre} planta ${bano.planta}`  // Nueva propiedad combinada
      }));
      
      res.status(200).json(baniosModificados);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async postBano(req, res) {
    try {
      const banio = req.body;
      // se separa la ubicación del edificio
      const { nombre, planta } = separarUbicacion(banio.ubicacion);

      // Validar el esquema de la encuesta
      const resultado = await validarBanoZod({nombre: nombre, planta: planta, genero_bano: banio.genero_bano});   

      try{
        if (!resultado.success) {
          throw new Error("Error de validación", resultado.error.errors);
        }
      } catch {
        res.status(400).json({ message: "Error de validación, la peticion cuenta con campos incorrectos", error: resultado.error.errors });
        return;
      }
      

      // crear en la base de datos
      BanoModel.agregarBano({nombre: nombre, planta: planta, genero_bano: banio.genero_bano})
        .then((banio) => {
          res.status(200).json({ message: "Banio creado", banio });
        })
        .catch((error) => {
          res.status(500).json({ message: "Error al crear el banio", error });
        });
      
    } catch (error) {
      res.status(500).json({ message: "Error de validación", errors: error });
    }
  }
}