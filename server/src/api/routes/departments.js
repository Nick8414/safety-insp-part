const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const Department = require('../models/department');
const DepartmentController = require('../controllers/departments');

router.get('/', DepartmentController.department_get_all);

router.post('/', checkAuth, DepartmentController.department_create);

router.patch('/', checkAuth, DepartmentController.department_update);

router.delete('/:id', checkAuth, DepartmentController.department_delete);

module.exports = router;