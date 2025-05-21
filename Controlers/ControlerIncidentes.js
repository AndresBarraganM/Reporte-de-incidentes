import { IncidenteModel } from '../Modelos/AmazonRDS/IncidenteModel.js'; // modelo de incidentes

import { validarIncidenteZod } from '../Schemas/IncidenteSchema.js'
import { validarFoto } from '../Schemas/FotoSchema.js';

import { separaUbicacion } from '../utils/functions/separarUbicacion.js';
import { almacenarFoto, recuperarPathFoto } from '../utils/functions/fotoMethods.js';
import { extraerFiltros } from '../utils/functions/filtrosDeQuery.js';

export class ControlerIncidentes {

  // retornar incidentes
  static async getIncidentes(req, res) {
    try {
      const filtros = extraerFiltros(req.query);
      
      // recuperar reporte
      const incidentes = await IncidenteModel.obtenerIncidentes(filtros);
      console.log(filtros)
      
      res.status(200).json(incidentes);

    }catch(error){
      res.status(500).json({ error: 'Error al recuperar los incidentes', error });
    }
  }

  // obtener foto de un incidente seugn ID
  static async getFotoIncidente(req, res) {
    let id_reporte = null
    let nombreFoto, recuperar_foto = null

    try {
      id_reporte = parseInt(req.params.id);
    } catch (error) {
      res.status(400).json({ message: 'Error al parsear el id', error: error.message });
      return
    }


    // recuperar nombre   PENDIENTE
    try {
      nombreFoto = await IncidenteModel.obtenerFotoIncidente(id_reporte);
    } catch (error) {
      res.status(500).json({ message: 'Error al recuperar la foto de la base de datos', error: error.message});
      return
    }

    if (nombreFoto == null) {
      res.status(404).json({ message: 'No se encontro foto relacionada a este reporte', error: "el reporte no cuenta con una foto relacionada" });
      return
    }
    
    // obtener el archivo de la foto
    try {
      const Path_foto = await recuperarPathFoto(nombreFoto);
      
      res.status(200).sendFile(Path_foto)
      
      return
    }catch(error){
      res.status(500).json({ message: 'Error al recuperar el archivo de foto', error: error.message });
      return
    }
  }

  // agregar un incidente a la base de datos
  static async postIncidente(req, res) {
    let reporte, foto

    // conprobar segun esquema
    if (req.body.data== null) {
      return res.status(400).json({ error: "faltan campos requeridos"})
    }
    

    try {
      reporte = JSON.parse(req.body.data);

      foto = req.files.foto ? req.files.foto[0]  : false;

    } catch (error) {
      res.status(500).json({error: "error al parsear el json: " + error})
      return
    }

    // separar el campo de banio y eliminar ubicacion
    // validar que el campo de ubicacion no este vacio
    if (!reporte.ubicacion) {
      res.status(400).json({error: "el campo ubicacion no puede estar vacio"})
      return
    }
    const ubicacion = reporte.ubicacion
    const resultado = separaUbicacion(ubicacion);
    reporte.nombre = resultado.nombre;
    reporte.planta = resultado.planta;
    delete reporte.ubicacion;

    // verificar reporte
    const resultadoVerificacion = await validarIncidenteZod(reporte)
    if (!resultadoVerificacion.success){
      res.status(400).json({error: resultadoVerificacion.error})
      return
    }

    // agregar a base de datos
    // manejar foto
    if(foto){
      if (!validarFoto(foto)){
        res.status(400).json({error: "formato de la foto incorrecto"}) 
       return
      }  
      try {
        const nombreFoto = await almacenarFoto(foto)

        reporte.img = nombreFoto
      } catch (error) {
        console.log("error al almacenar la foto: " + error)      
      }
    }

    // agregar reportes
    try {
      await IncidenteModel.generarIncidente(reporte)
    } catch (error) {
      res.status(500).json({message: "no se pudo registar el incidente", error: error})       
    }

    res.status(200).json({message: "incidente registrado exitosamente"})
  }

   static async actualizarEstadoIncidente(req, res) {
    const { id } = req.params;
    const { estado } = req.body;

    try {
      const resultado = await IncidenteModel.actualizarEstado(id, estado);
      if (resultado[0] === 0) {
        return res.status(404).json({ error: 'Incidente no encontrado' });
      }

      res.json({ mensaje: 'Estado actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar el estado del incidente:', error);
      res.status(500).json({ error: 'Error al actualizar estado' });
    }
  }
}
// formato de un incidente
// DESPUES de separar el campo ubicacion
// const incidente = {
//   genero_bano: 'hombre',
//   tipo_incidente: 'Banadalismo',
//   descripcion: 'agua',
//   nombre: 'Centro de Información',
//   planta: 'baja'
// }


