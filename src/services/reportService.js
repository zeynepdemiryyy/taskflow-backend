const { readTasks } = require('../utils/fileHandler');

class ReportService {
  async getCompletedCount() {
    const tasks = await readTasks();
    return { count: tasks.filter(t => t.status === 'completed').length };
  }

  async getPendingCount() {
    const tasks = await readTasks();
    return { count: tasks.filter(t => t.status === 'pending').length };
  }

  async getSummaryReport() {
    const tasks = await readTasks();
    return {
      totalTasks: tasks.length,
      byStatus: {
        completed: tasks.filter(t => t.status === 'completed').length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length
      },
      byPriority: {
        high: tasks.filter(t => t.priority === 'high').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        low: tasks.filter(t => t.priority === 'low').length
      }
    };
  }
}

module.exports = new ReportService();
