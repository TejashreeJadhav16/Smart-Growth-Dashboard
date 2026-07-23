const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

router.get('/', goalController.getGoals);
router.get('/:id', goalController.getGoalById); // <-- ADD THIS LINE
router.post('/', goalController.createGoal);
router.put('/:id', goalController.updateGoal);
router.delete('/:id', goalController.deleteGoal);

module.exports = router;