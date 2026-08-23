const validateTaskInput = (req, res, next) => {
  const { title, description, priority, assignee, status } = req.body;
  const validPriorities = ['low', 'medium', 'high'];
  const validStatuses = ['pending', 'in-progress', 'completed'];

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz Veri',
      message: "'title' alanı zorunludur ve metin olmalıdır."
    });
  }

  if (!description || typeof description !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz Veri',
      message: "'description' alanı zorunludur ve metin olmalıdır."
    });
  }

  if (!priority || !validPriorities.includes(priority.toLowerCase())) {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz Veri',
      message: `'priority' zorunludur. Alabileceği değerler: ${validPriorities.join(', ')}`
    });
  }

  if (!assignee || typeof assignee !== 'string' || assignee.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz Veri',
      message: "'assignee' alanı zorunludur."
    });
  }

  if (status && !validStatuses.includes(status.toLowerCase())) {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz Veri',
      message: `'status' geçersiz. Alabileceği değerler: ${validStatuses.join(', ')}`
    });
  }

  next();
};

module.exports = { validateTaskInput };
