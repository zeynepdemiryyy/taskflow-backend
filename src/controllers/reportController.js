const taskService = require('../services/taskService');

exports.getCompletedTasksCount = async (req, res, next) => {
  try {
    const count = await taskService.getCompletedTasksCount();
    res.status(200).json({ success: true, count });
  } catch (error) {
    next(error);
  }
};

exports.getPendingTasksCount = async (req, res, next) => {
  try {
    const count = await taskService.getPendingTasksCount();
    res.status(200).json({ success: true, count });
  } catch (error) {
    next(error);
  }
};

exports.getSummaryReport = async (req, res, next) => {
  try {
    const summary = await taskService.getSummaryReport();
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
};