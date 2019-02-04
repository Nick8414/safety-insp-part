const express = require('express');
const router = express.Router();
const ConditionOfEquipment = require('../models/conditionOfEquipment');
const checkAuth = require('../middleware/check-auth');
const ConditionOfEquipmentController = require('../controllers/conditionOfEquipment');

router.get('/', checkAuth, ConditionOfEquipmentController.conditionOfEquipment_get_all);

router.post('/', checkAuth, ConditionOfEquipmentController.conditionOfEquipment_create );

router.patch('/', checkAuth, ConditionOfEquipmentController.conditionOfEquipment_update);

router.delete('/:id', checkAuth, ConditionOfEquipmentController.conditionOfEquipment_delete);

module.exports = router;