import { UsuarioModelo } from "../../Modelos/AmazonRDS/UsuarioModel.js";
import { generarToken } from '../../utils/functions/jwt.js';
import { compararPassword } from '../../utils/security.js';
import { verificarUsuarioCredencialesZod } from "../../Schemas/UsuarioSchema.js";
import bcryptjs from "bcryptjs";

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, telefono, rol, contrasenia} = req.body;
    
    // realizar validaciones
    const validacion = verificarUsuarioCredencialesZod(req.body);
    if (!validacion.success) {
      return res.status(400).json({
        error: "Datos del usuario no válidos",
        detalles: validacion.error.format()
      });
    }


    const nuevoUsuario = UsuarioModelo.agregarUsuario({
      nombre,
      email,
      telefono,
      rol,
      contrasenia
    });

    if (!nuevoUsuario) {
      return res.status(400).json({
        error: "El correo ya está registrado"
      });
    }

    res.status(201).json({
      success: true,
      alumno: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        telefono: nuevoUsuario.telefono,
        rol: nuevoUsuario.rol,
        contrasenia: nuevoUsuario.contrasenia
      }
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { nombre, contrasenia } = req.body;

    const user = UsuarioModelo.getUsuarios(nombre);
    //console.log("Contraseña recibida:", password);
    //console.log("Hash almacenado:", alumno?.password);
    const hash = await bcryptjs.hash(contrasenia, 10);
    console.log("Hash generado:", hash);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const contraseniaValida = await compararPassword(contrasenia, user.contrasenia);
    console.log(password)
    console.log(user.contrasenia)
    console.log(passwordValida)

    if (!contraseniaValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = generarToken(user);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,          
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        rol: user.rol,
        contrasenia: user.contrasenia
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};