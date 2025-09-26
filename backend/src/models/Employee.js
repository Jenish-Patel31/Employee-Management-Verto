const db = require('../config/database');

class Employee {
  static getAll(callback) {
    const query = 'SELECT * FROM employees ORDER BY created_at DESC';
    db.all(query, [], callback);
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM employees WHERE id = ?';
    db.get(query, [id], callback);
  }

  static create(employeeData, callback) {
    const { name, email, position } = employeeData;
    const query = 'INSERT INTO employees (name, email, position) VALUES (?, ?, ?)';
    db.run(query, [name, email, position], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, ...employeeData });
      }
    });
  }

  static update(id, employeeData, callback) {
    const { name, email, position } = employeeData;
    const query = 'UPDATE employees SET name = ?, email = ?, position = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    db.run(query, [name, email, position, id], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id, ...employeeData });
      }
    });
  }

  static delete(id, callback) {
    const query = 'DELETE FROM employees WHERE id = ?';
    db.run(query, [id], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { deletedRows: this.changes });
      }
    });
  }

  static getByEmail(email, callback) {
    const query = 'SELECT * FROM employees WHERE email = ?';
    db.get(query, [email], callback);
  }
}

module.exports = Employee;
