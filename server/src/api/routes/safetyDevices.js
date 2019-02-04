const express = require('express');
const router = express.Router();
const SafetyDevice = require('../models/safetyDevice');
const DeviceType = require('../models/deviceType');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const SafetyDevicesController = require('../controllers/safetyDevices')

router.get('/', checkAuth, SafetyDevicesController.safetyDevices_get_all);

router.get('/safetyDevicesAdmin', checkAuth, SafetyDevicesController.safetyDevices_get_admin_all);

router.get('/numberOfSafetyDevices', SafetyDevicesController.safetyDevices_get_number);

router.get('/psdDescriptionOfSafetyDevices', SafetyDevicesController.safetyDevices_description);

router.get('/fieldTagOfSafetyDevices', SafetyDevicesController.safetyDevices_tag);

router.get('/flowSheetOfSafetyDevices', SafetyDevicesController.safetyDevices_flow_sheet);

router.get('/installationPlaceOfSafetyDevices', SafetyDevicesController.safetyDevices_installation_place);

router.get('/responsibleOfSafetyDevices', SafetyDevicesController.safetyDevices_responsible);

router.get('/statusesOfSafetyDevices', SafetyDevicesController.safetyDevices_statuses);

router.get('/filterDepartments', SafetyDevicesController.safetyDevices_filter_departments);

router.get('/:safetyDeviceId', SafetyDevicesController.safetyDevices_get_one);

router.post('/', checkAuth, SafetyDevicesController.safetyDevices_create);

router.patch('/', checkAuth, SafetyDevicesController.safetyDevices_update);

router.delete('/:safetyDeviceId', checkAuth, SafetyDevicesController.safetyDevices_delete);


module.exports = router;