const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/',  employeeController.getAll);

router.get('/:id', employeeController.getSingle);

router.post('/', isAuthenticated, validation.saveEmployee,  employeeController.createEmployee);

router.put('/:id', isAuthenticated, validation.saveEmployee,  employeeController.updateEmployee);

router.delete('/:id', isAuthenticated, employeeController.deleteEmployee);

module.exports = router;