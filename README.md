![Logo de ReporTec](view/logo.png)

# 📋 Reporte de Incidentes

Aplicación web para registrar, gestionar y visualizar reportes de incidentes ocurridos en baños de una institución educativa. Esta plataforma permite a los usuarios generar reportes mediante un sistema intuitivo y a los administradores gestionarlos eficientemente.

---

## 🧩 Tecnologías utilizadas

- **Backend**: Node.js + Express.js
- **Base de datos**: MySQL (Amazon RDS)
- **ORM**: Sequelize
- **Frontend**: HTML, CSS, Bootstrap, JavaScript
- **Estructura MVC** (Modelo - Vista - Controlador)

---

## 📁 Estructura del proyecto

Reporte-de-incidentes/
│
├── controllers/ # Lógica de controladores (manejo de solicitudes)
├── middlewares/ # Middlewares personalizados (autenticación, validación)
├── models/ # Modelos Sequelize (tablas y relaciones)
├── services/ # Servicios para la lógica de negocio
├── view/ # Plantillas HTML
├── modules/ # Funciones auxiliares reutilizables
├── schemas/ # Validación de datos (Zod, Joi u otro)
├── test/ # Pruebas del sistema
├── utils/ # Utilidades generales
├── incidentes.sql # Script de creación de base de datos
├── index.js # Punto de entrada del servidor
├── .env # Variables de entorno
└── package.json # Dependencias del proyecto
