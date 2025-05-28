import bcrypt from 'bcryptjs';
//import { DatabaseError, ValidationError } from '../errors.js';
import { obtenerIdDeReq } from '../utils/functions/request.js';
import { verificarUsuarioZod, verificarUsuarioCredencialesZod, validarParcialUsuario } from '../Schemas/UsuarioSchema.js'
import { UsuarioModelo } from '../Modelos/AmazonRDS/UsuarioModel.js'
import { generarToken } from '../utils/functions/jwt.js'
import { verificarToken } from '../utils/functions/jwt.js';


  
export class ControlerUsuario {

    static async loginUsuario(req, res){
      const datos = req.body

      // validar datos
      const verificacion = verificarUsuarioCredencialesZod(datos)
      if (verificacion.success === false) {
        return res.status(400).json({ message: "peticion no valida",error: verificacion.error.errors })
      }

      let usuario = null
      // verificar que si existe
      try {
        usuario = await UsuarioModelo.validarCuenta(datos.nombre);
        if (!usuario) {
            return res.status(404).json({ message: 'correo o contraseña no validas' });
          }

        const passwordValida = await bcrypt.compare(datos.contrasena_hash, usuario.contrasena_hash)

        if (!passwordValida) {
          return res.status(401).json({
          error: "Contraseña incorrecta"
      });
        }
        if (usuario === null) {
          return res.status(404).json({ message: 'correo o contraseña no validas' })
        }
      } catch (error) {
        res.status(500).json({ message: 'Error al buscar usuario:', error: error })
        return
      }

      // generar token
      const token = generarToken({
          id_usuario: usuario.id_usuario,
          nombre: usuario.nombre
      });

      // devolver token y datos del usuario
      return res.status(200).json({ success: true, message: 'Login exitoso', token: token})
    }

  // Crear nuevo usuario
  static async postUsuario(req, res) {
    const data = req.body

    // verificar que los datos son correctos
    const verificacion = verificarUsuarioZod(data)
    if (verificacion.success === false) {
      return res.status(400).json({ error: verificacion.error.errors })
    }

    // verificar que el correo no existe
    try {
      const usuario = await UsuarioModelo.getUsuarios(data.email)
      if (usuario != null) {
        return res.status(400).json({ message: 'El correo ya está registrado' })
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error al verificar el correo', error: error })
    }

    // enviar a metodo para crear usuario
    try{
      await UsuarioModelo.agregarUsuario(data)
    } catch(error){
      return res.status(500).json({ message: "error al agregar usuario", error: error })
    }

    // retornar mensaje
    
    res.status(200).json({ message: 'Usuario creado correctamente' })
    /*
    Codigo previo
    try {
      const hashedPassword = await bcrypt.hash(userData.contrasena, this.SALT_ROUNDS);
      
      const [result] = await this.db.execute(
        `INSERT INTO usuarios 
        (nombre, email, telefono, rol, contrasena_hash)
        VALUES (?, ?, ?, ?, ?)`,
        [
          userData.nombre,
          userData.email,
          userData.telefono,
          userData.rol,
          hashedPassword
        ]
      );
      
      return this.getUserById(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ValidationError('El email ya está registrado');
      }
      throw new DatabaseError('Error al crear usuario');
    }
    */
  }

/**
   * Actualiza los datos de un usuario identificado por el id en el token.
   * 
   * Pasos:
   * 1. Valida los datos del cuerpo de la petición usando validación parcial.
   * 2. Obtiene el id del usuario desde el token.
   * 3. Si se incluye una contraseña, se encripta antes de guardar.
   * 4. Llama al modelo para actualizar al usuario.
   * 5. Retorna el resultado de la operación o errores si los hay.
   *
   * @static
   * @async
   * @function updateUsuario
   * @param {Request} req - Objeto de solicitud HTTP con los datos nuevos del usuario.
   * @param {Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<Response>} - Respuesta con el estado de la operación.
   */
  static async updateUsuario(req, res) {
    try {
        // obtener y verificacion de usuario
        const datos = req.body;
        console.log(datos)
        if (!validarParcialUsuario(datos)) {
            return res.status(400).json({ error: "Datos en la petición incorrectos" });
        }

        const id = obtenerIdDeReq(req);
        if (!id) {
            return res.status(400).json({ error: "id no encontrado en el token" });
        }

        // Actualizar el usuario
        const resultado = await UsuarioModelo.updateUsuario(datos, id);
        
        // Verificar si la actualización fue exitosa
        if (!resultado) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // No enviar contrase;a porsupuesto
        delete resultado.password;

        // retornar mensaje
        res.status(200).json({
            success: true,
            message: "Datos actualizados correctamente",
            datos: resultado
        });

    } catch (error) {
        console.error("Error en updateUsuario:", error);
        res.status(500).json({ 
            error: "Error interno del servidor",
            detalles: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
  }

  
  /* 
  // Actualizar usuario
  async updateUser(userId, updateData) {
    this.validateUpdateData(updateData);
    
    const fields = [];
    const values = [];
    
    if (updateData.nombre) {
      fields.push('nombre = ?');
      values.push(updateData.nombre);
    }
    
    if (updateData.email) {
      fields.push('email = ?');
      values.push(updateData.email);
    }
    
    if (updateData.telefono) {
      fields.push('telefono = ?');
      values.push(updateData.telefono);
    }
    
    if (updateData.rol) {
      fields.push('rol = ?');
      values.push(updateData.rol);
    }
    
    if (updateData.contrasena) {
      const hashedPassword = await bcrypt.hash(updateData.contrasena, this.SALT_ROUNDS);
      fields.push('contrasena_hash = ?');
      values.push(hashedPassword);
    }
    
    if (fields.length === 0) {
      throw new ValidationError('No hay datos para actualizar');
    }
    
    values.push(userId);
    
    try {
      await this.db.execute(
        `UPDATE usuarios SET ${fields.join(', ')} WHERE id_usuario = ?`,
        values
      );
      
      return this.getUserById(userId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ValidationError('El email ya está registrado');
      }
      throw new DatabaseError('Error al actualizar usuario');
    }
  }
 */
/* 
  // Eliminar usuario
  static async deleteUsuario(req, res) {
    await this.db.execute(
      'DELETE FROM usuarios WHERE id_usuario = ?',
      [userId]
    );
    
    return { message: 'Usuario eliminado correctamente' };
  }
 */


  // Obtener usuarios basicos (id, nombre, email)
static async getUsuariosBasico(req, res) {
  try {
    const usuarios = await UsuarioModelo.getUsuariosBasico()
    return res.status(200).json(usuarios)
  } catch (error) {
    console.error('Error al obtener usuarios basicos:', error)
    return res.status(500).json({ message: 'Error al obtener los usuarios basicos', error })
  }
}

static async getPerfilUsuario(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

    const decoded = verificarToken(token);

    if (!decoded.id_usuario) {
      return res.status(400).json({ message: 'Token inválido' });
    }

    const usuario = await UsuarioModelo.getUsuarioPorId(decoded.id_usuario);

    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(usuario); // Devuelve nombre, email, telefono, etc.
  } catch (error) {
    console.error('Error al obtener perfil', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}



//CONTROLER PARA BORRAR UN USUARIO
static async deleteUsuario(req, res) {
  const id = req.params.id;

  try {
    const resultado = await UsuarioModelo.eliminarUsuario(id);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
}


}