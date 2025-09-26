const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');

// Get all employees
const getAllEmployees = (req, res) => {
  Employee.getAll((err, employees) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching employees',
        error: err.message
      });
    }
    res.status(200).json({
      success: true,
      data: employees,
      count: employees.length
    });
  });
};

// Get employee by ID
const getEmployeeById = (req, res) => {
  const { id } = req.params;
  
  Employee.getById(id, (err, employee) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching employee',
        error: err.message
      });
    }
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: employee
    });
  });
};

// Create new employee
const createEmployee = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { name, email, position } = req.body;

  // Check if email already exists
  Employee.getByEmail(email, (err, existingEmployee) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error checking email',
        error: err.message
      });
    }

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee with this email already exists'
      });
    }

    Employee.create({ name, email, position }, (err, newEmployee) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error creating employee',
          error: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: 'Employee created successfully',
        data: newEmployee
      });
    });
  });
};

// Update employee
const updateEmployee = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { id } = req.params;
  const { name, email, position } = req.body;

  // Check if employee exists
  Employee.getById(id, (err, existingEmployee) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error checking employee',
        error: err.message
      });
    }

    if (!existingEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check if email is being changed and if new email already exists
    if (email !== existingEmployee.email) {
      Employee.getByEmail(email, (err, emailExists) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error checking email',
            error: err.message
          });
        }

        if (emailExists) {
          return res.status(400).json({
            success: false,
            message: 'Employee with this email already exists'
          });
        }

        // Update employee
        Employee.update(id, { name, email, position }, (err, updatedEmployee) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: 'Error updating employee',
              error: err.message
            });
          }

          res.status(200).json({
            success: true,
            message: 'Employee updated successfully',
            data: updatedEmployee
          });
        });
      });
    } else {
      // Update employee without email check
      Employee.update(id, { name, email, position }, (err, updatedEmployee) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error updating employee',
            error: err.message
          });
        }

        res.status(200).json({
          success: true,
          message: 'Employee updated successfully',
          data: updatedEmployee
        });
      });
    }
  });
};

// Delete employee
const deleteEmployee = (req, res) => {
  const { id } = req.params;

  // Check if employee exists
  Employee.getById(id, (err, existingEmployee) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error checking employee',
        error: err.message
      });
    }

    if (!existingEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    Employee.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error deleting employee',
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Employee deleted successfully',
        data: { deletedRows: result.deletedRows }
      });
    });
  });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
