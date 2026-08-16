const taskService = require('../services/taskService');

exports.getAllTasks = async (req, res, next) => {
  try {
    const result = await taskService.getAllTasks(req.query);
    res.status(200).json({
      success: true,
      count: result.data.length,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages
      },
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Belirtilen ID ile eşleşen görev bulunamadı.'
      });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json({
      success: true,
      message: 'Görev başarıyla oluşturuldu.',
      data: newTask
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Güncellenecek görev bulunamadı.'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Görev başarıyla güncellendi.',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const isDeleted = await taskService.deleteTask(req.params.id);
    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Silinecek görev bulunamadı.'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Görev başarıyla silindi.'
    });
  } catch (error) {
    next(error);
  }
};