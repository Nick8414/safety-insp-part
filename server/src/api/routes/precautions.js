const express = require('express');
const router = express.Router();

const Precaution = require('../models/specialPrecaution');
const checkAuth = require('../middleware/check-auth');

const PrecautionsController = require ('../controllers/precautions');

router.get('/', checkAuth, PrecautionsController.precautions_get_all);

router.post('/', checkAuth, PrecautionsController.precautions_create);

router.patch('/', checkAuth, PrecautionsController.precautions_update);

router.delete('/:id', checkAuth, PrecautionsController.precautions_delete);

module.exports = router;