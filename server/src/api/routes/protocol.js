const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const Protocol = require('../models/protocol');
const ProtocolsController = require('../controllers/protocol');

router.get('/', checkAuth, ProtocolsController.protocols_get_all);

router.post('/', checkAuth, ProtocolsController.protocols_create);

router.patch('/', checkAuth, ProtocolsController.protocols_update);

router.delete('/:id', checkAuth, ProtocolsController.protocols_delete);

module.exports = router;