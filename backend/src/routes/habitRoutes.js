const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

router.get('/', habitController.getHabits);
router.get('/:id', habitController.getHabitById);
router.post('/', habitController.createHabit);
router.put('/:id', habitController.updateHabit);
router.put('/:id/toggle', habitController.toggleHabit);
router.delete('/:id', habitController.deleteHabit);

module.exports = router;