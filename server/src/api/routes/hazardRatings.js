const express = require('express');
const router = express.Router();
const HazardRating = require('../models/hazardRating');
const checkAuth = require('../middleware/check-auth');
const HazardRatingsController = require('../controllers/hazardRatings');

router.get('/', checkAuth, HazardRatingsController.hazardRatings_get_all);

router.post('/', checkAuth, HazardRatingsController.hazardRatings_create);

router.patch('/', checkAuth, HazardRatingsController.hazardRatings_update);

router.delete('/:id', checkAuth, HazardRatingsController.hazardRatings_delete);

module.exports = router;