const express = require('express');
const router = express.Router();
const InspectionType = require('../models/inspectionType');
const checkAuth = require('../middleware/check-auth');
const InspectionTypesController = require('../controllers/inspectionTypes');

router.get('/', checkAuth, InspectionTypesController.inspectionTypes_get_all);

router.post('/', checkAuth, InspectionTypesController.inspectionTypes_create);

router.patch('/', checkAuth, InspectionTypesController.inspectionTypes_update);

router.delete('/:id', checkAuth, InspectionTypesController.inspectionTypes_delete);

module.exports = router;