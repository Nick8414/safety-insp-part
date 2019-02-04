const express = require('express');
const router = express.Router();
const DeviceType = require('../models/deviceType');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const deviceTypeController = require('../controllers/deviceTypes');

router.get('/', checkAuth, deviceTypeController.deviceTypes_get_all);

router.post('/', checkAuth, deviceTypeController.deviceTypes_create);

router.patch('/', checkAuth, deviceTypeController.deviceTypes_update );

router.delete('/:safetyDeviceId', checkAuth, deviceTypeController.deviceTypes_delete);

module.exports = router;