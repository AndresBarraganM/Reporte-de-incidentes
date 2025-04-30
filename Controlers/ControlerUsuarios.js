const bcrypt = require('bcrypt');
const { DatabaseError, ValidationError } = require('../errors');
import { verificarUsuarioZod } from '../Schemas/UsuarioSchema.js'
import { UsuarioModelo } from '../Modelos/AmazonRDS/UsuarioModel.js'

export class ControlerUsuario {

  static async loginUsuario(req, res){
    const datos = req.body

    // validar datos
    const verificacion = verificarUsuarioZod(datos)
    if (verificacion.success === false) {
      return res.status(400).json({ error: verificacion.error.errors })
    }

    // verificar que si existe y realizar login
    try {
      
    } catch (error) {
      
    }

    // generar token


    // devolver token y datos del usuario
    return res.status(200).json({ message: 'Login exitoso' })
  }

  // Crear nuevo usuario
  static async postUsuario(req, res) {
    const data = req.body

    // verificar que los datos son correctos
    const verificacion = verificarUsuarioZod(data)
    if (verificacion.success === false) {
      return res.status(400).json({ error: verificacion.error.errors })
    }

    // enviar a metodo para crear usuario
    try{
      UsuarioModelo.agregarUsuario(datos)
    } catch(error){
      return res.status(500).json({ error: error })
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

  // Eliminar usuario
  async deleteUsuario(req, res) {
    await this.db.execute(
      'DELETE FROM usuarios WHERE id_usuario = ?',
      [userId]
    );
    
    return { message: 'Usuario eliminado correctamente' };
  }

}