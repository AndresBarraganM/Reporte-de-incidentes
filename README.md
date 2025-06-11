<div align="center">
  
# ReporTec

</div>

Reportec permite a cualquier miembro de la comunidad universitaria escanear un código QR ubicado en los baños para reportar situaciones como la falta de papel, agua tirada, suciedad u otros problemas. Una vez enviado el reporte, este llega directamente al sistema, donde puede ser visualizado y gestionado por el personal encargado del mantenimiento o limpieza.

---

<div align="center">
  
## Tecnologías utilizadas

</div>

- **Backend**: Node.js + Express.js
- **Base de datos**: MySQL (Amazon RDS)
- **ORM**: Sequelize
- **Frontend**: HTML, CSS, Bootstrap, JavaScript
- **Estructura MVC** (Modelo - Vista - Controlador)

---

<div align="center">
  
## Estructura del proyecto

</div>

```bash
Reporte-de-incidentes/
│
├── controllers/         # Lógica de controladores (manejo de solicitudes)
├── middlewares/         # Middlewares personalizados (autenticación, validación)
├── models/              # Modelos Sequelize (tablas y relaciones)
├── services/            # Servicios para la lógica de negocio
├── view/                # Plantillas HTML
├── modules/             # Funciones auxiliares reutilizables
├── schemas/             # Validación de datos (Zod, Joi u otro)
├── test/                # Pruebas del sistema
├── utils/               # Utilidades generales
├── incidentes.sql       # Script de creación de base de datos
├── index.js             # Punto de entrada del servidor
├── .env                 # Variables de entorno
└── package.json         # Dependencias del proyecto
