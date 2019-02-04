const express = require('express');
const router = express.Router();

const Skill = require('../models/skill');
const checkAuth = require('../middleware/check-auth');

const SkillsController = require('../controllers/skills');

router.get('/', checkAuth, SkillsController.skills_get_all);

router.post('/', checkAuth, SkillsController.skills_create);

router.patch('/', checkAuth, SkillsController.skills_update);

router.delete('/:id', checkAuth, SkillsController.skills_delete);

module.exports = router;