const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const LogController = require('../controllers/logs');

router.get('/', LogController.logs_get_all);

router.patch('/', checkAuth, LogController.log_update);

module.exports = router;