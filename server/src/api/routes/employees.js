const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const Employee = require('../models/employee');
const employeesController = require('../controllers/employees');

router.get('/', employeesController.employees_get_all);

router.post('/', checkAuth, employeesController.employees_create);

router.patch('/', employeesController.employees_update);

router.delete('/:id', employeesController.employees_delete);

module.exports = router;