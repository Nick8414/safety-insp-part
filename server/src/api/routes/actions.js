const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Action = require('../models/action');
const ActionController = require('../controllers/actions');

router.get('/', checkAuth, ActionController.actions_get_all);

router.post('/', checkAuth, ActionController.actions_create);
router.patch('/', checkAuth, ActionController.actions_update);
router.patch('/closeAction', checkAuth, ActionController.actions_close);

router.delete('/:id', checkAuth, ActionController.actions_delete);

module.exports = router;