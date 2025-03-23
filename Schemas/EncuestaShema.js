const { z } = require("zod");

// Definir los valores permitidos para los enumerados
const EdificioEnum = z.enum(
  ["100", "200", "300", "400", "500","600","auditorio","centro informacion", "gimnasios"],
  {
  "required_error": "El campo 'edificio' es requerido",
  "invalid_type_error": "El campo 'edificio' ha de ser uno de los indicados",
  "invalid_enum_error": "El campo 'edificio' ha de ser uno de los indicados"
  }
);

const GeneroEnum = z.enum(
  ["masculino", "femenino"],
{
  "invalid_type_error": "El campo 'genero' ha de ser un genero de los listados",
  "invalid_enum_error": "El campo 'genero' ha de ser uno de los incluidos"
}
);

const TipoIncidenteEnum = z.enum(
  ["vandalizmo", "limpiesa", "Otro"],
  {
  "required_error": "El campo 'tipo_incidente' es requerido",
  "invalid_type_error": "El campo 'tipo_incidente' ha de ser un tipo de incidente",
  "invalid_enum_error": "El campo 'tipo_incidente' ha de ser uno de los indicados"
  }
);

// Esquema de validación para el objeto
export const encuestaSchema = z.object({
  fechaHora: z.string().datetime(), // Valida que sea una fecha válida
  edificio: EdificioEnum, // Valida que sea uno de los valores del enumerado
  genero: GeneroEnum.optional, 
  tipo_incidente: TipoIncidenteEnum, 
  descripcion: z.string().max(250, "La descripción no puede exceder los 250 caracteres"), // Valida que sea un string de máximo 250 caracteres
});
