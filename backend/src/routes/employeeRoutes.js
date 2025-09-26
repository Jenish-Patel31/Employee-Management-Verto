const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { employeeValidation } = require('../middleware/validation');

// GET /api/employees - Get all employees
router.get('/', getAllEmployees);

// GET /api/employees/:id - Get employee by ID
router.get('/:id', getEmployeeById);

// POST /api/employees - Create new employee
router.post('/', employeeValidation, createEmployee);

// PUT /api/employees/:id - Update employee
router.put('/:id', employeeValidation, updateEmployee);

// DELETE /api/employees/:id - Delete employee
router.delete('/:id', deleteEmployee);

module.exports = router;
