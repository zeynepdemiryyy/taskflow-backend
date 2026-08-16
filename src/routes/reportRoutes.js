const express = require('express');
const router = express.Router();
const {
  getCompletedTasksCount,
  getPendingTasksCount,
  getSummaryReport
} = require('../controllers/reportController');

router.get('/completed', getCompletedTasksCount);
router.get('/pending', getPendingTasksCount);
router.get('/summary', getSummaryReport);

module.exports = router;