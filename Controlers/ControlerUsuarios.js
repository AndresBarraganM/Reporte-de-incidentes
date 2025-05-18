//import bcrypt from 'bcryptjs';
//import { DatabaseError, ValidationError } from '../errors.js';
import { verificarUsuarioZod, verificarUsuarioCredencialesZod } from '../Schemas/UsuarioSchema.js'
import { UsuarioModelo } from '../Modelos/AmazonRDS/UsuarioModel.js'
import { generarToken } from '../utils/functions/jwt.js'

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
        usuario = await UsuarioModelo.validarCuenta(datos.nombre, datos.contrasenia)

        console.log(usuario)
        if (usuario == null) {
          return res.status(404).json({ message: 'correo o contrasena no validas' })
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
      return res.status(200).json({ message: 'Login exitoso', token: token})
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
}