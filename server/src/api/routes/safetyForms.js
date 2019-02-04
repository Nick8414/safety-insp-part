const express = require('express');
const router  = express.Router();
const Form    = require('../models/safetyForm');
const checkAuth = require('../middleware/check-auth');
const FormsController = require ('../controllers/safetyForms')

router.get('/', checkAuth, FormsController.forms_get_all);

router.post('/', checkAuth, FormsController.forms_create);

router.delete('/:id', checkAuth, FormsController.forms_delete);

module.exports = router;