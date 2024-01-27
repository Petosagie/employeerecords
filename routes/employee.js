const express = require ('express');
const router = express.Router();

const employeeController = require('../controllers/employee');
const validation = require('../middleware/validate');

router.get('/', employeeController.getAll);

router.get('/:id', employeeController.getSingle);

router.post('/', validation.saveEmployee, employeeController.createEmployee);

router.put('/:id', validation.saveEmployee, employeeController.updateEmployee);

router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;