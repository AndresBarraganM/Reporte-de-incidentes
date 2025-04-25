const bcrypt = require('bcrypt');
const { DatabaseError, ValidationError } = require('../errors');

class UserController {
  constructor(db) {
    this.db = db;
    this.SALT_ROUNDS = 10;
  }

  // Crear nuevo usuario
  async createUser(userData) {
    this.validateUserData(userData);
    
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
  }

  // Obtener usuario por ID
  async getUserById(userId) {
    const [rows] = await this.db.execute(
      `SELECT id_usuario, nombre, email, telefono, rol
       FROM usuarios WHERE id_usuario = ?`,
      [userId]
    );
    
    if (rows.length === 0) {
      throw new DatabaseError('Usuario no encontrado');
    }
    
    return rows[0];
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
  async deleteUser(userId) {
    await this.db.execute(
      'DELETE FROM usuarios WHERE id_usuario = ?',
      [userId]
    );
    
    return { message: 'Usuario eliminado correctamente' };
  }

  // Autenticación de usuario
  async authenticateUser(email, password) {
    const [rows] = await this.db.execute(
      `SELECT id_usuario, nombre, email, rol, contrasena_hash
       FROM usuarios WHERE email = ?`,
      [email]
    );
    
    if (rows.length === 0) {
      throw new ValidationError('Credenciales inválidas');
    }
    
    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.contrasena_hash);
    
    if (!isValid) {
      throw new ValidationError('Credenciales inválidas');
    }
    
    delete user.contrasena_hash;
    return user;
  }

  // Validación de datos
  validateUserData(userData) {
    const requiredFields = ['nombre', 'email', 'rol', 'contrasena'];
    const missingFields = requiredFields.filter(field => !userData[field]);
    
    if (missingFields.length > 0) {
      throw new ValidationError(`Campos requeridos: ${missingFields.join(', ')}`);
    }
    
    if (!this.isValidEmail(userData.email)) {
      throw new ValidationError('Formato de email inválido');
    }
    
    if (userData.telefono && !this.isValidPhone(userData.telefono)) {
      throw new ValidationError('Formato de teléfono inválido');
    }
    
    if (!['administrador', 'encargado_limpieza'].includes(userData.rol)) {
      throw new ValidationError('Rol inválido');
    }
  }

  // Validación de datos de actualización
  validateUpdateData(updateData) {
    if (updateData.email && !this.isValidEmail(updateData.email)) {
      throw new ValidationError('Formato de email inválido');
    }
    
    if (updateData.telefono && !this.isValidPhone(updateData.telefono)) {
      throw new ValidationError('Formato de teléfono inválido');
    }
    
    if (updateData.rol && !['administrador', 'encargado_limpieza'].includes(updateData.rol)) {
      throw new ValidationError('Rol inválido');
    }
  }

  // Helpers de validación
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPhone(phone) {
    return /^[0-9]{9,15}$/.test(phone);
  }
}

module.exports = UserController;