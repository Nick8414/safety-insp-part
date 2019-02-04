const express = require('express');
const router = express.Router();
const InspectionMethod = require('../models/inspectionMethod');
const checkAuth = require('../middleware/check-auth');
const InspectionMethodsController = require('../controllers/inspectionMethods');

router.get('/', checkAuth, InspectionMethodsController.inspectionMethods_get_all);

router.post('/', checkAuth, InspectionMethodsController.inspectionMethods_create);

router.patch('/', checkAuth, InspectionMethodsController.inspectionMethods_update);

router.delete('/:id', checkAuth, InspectionMethodsController.inspectionMethods_delete);

module.exports = router;