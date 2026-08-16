const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/tasks.json');

// Yardımcı Fonksiyon: JSON Verisini Oku
const readData = () => {
  try {
    if (!fs.existsSync(dataPath)) {
      return [];
    }
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    return [];
  }
};

// Yardımcı Fonksiyon: JSON Verisini Yaz
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
};

// 1. Tüm Görevleri Getir & Filtrele
exports.getAllTasks = async (query = {}) => {
  let tasks = readData();

  if (query.status) {
    tasks = tasks.filter(t => t.status === query.status);
  }
  if (query.priority) {
    tasks = tasks.filter(t => t.priority === query.priority);
  }
  if (query.search) {
    const searchTerm = query.search.toLowerCase();
    tasks = tasks.filter(t => 
      t.title.toLowerCase().includes(searchTerm) || 
      (t.description && t.description.toLowerCase().includes(searchTerm))
    );
  }

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    total: tasks.length,
    page,
    limit,
    totalPages: Math.ceil(tasks.length / limit),
    data: tasks.slice(startIndex, endIndex)
  };
};

// 2. ID ile Görev Getir
exports.getTaskById = async (id) => {
  const tasks = readData();
  return tasks.find(t => t.id === id) || null;
};

// 3. Yeni Görev Oluştur
exports.createTask = async (taskData) => {
  const tasks = readData();
  const newTask = {
    id: `task-${Date.now()}`,
    title: taskData.title,
    description: taskData.description || '',
    status: taskData.status || 'pending',
    priority: taskData.priority || 'medium',
    assignee: taskData.assignee || 'Unassigned',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  tasks.push(newTask);
  writeData(tasks);
  return newTask;
};

// 4. Görev Güncelle
exports.updateTask = async (id, updateData) => {
  const tasks = readData();
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...updateData,
    updatedAt: new Date().toISOString()
  };

  writeData(tasks);
  return tasks[index];
};

// 5. Görev Sil
exports.deleteTask = async (id) => {
  const tasks = readData();
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) return false;

  tasks.splice(index, 1);
  writeData(tasks);
  return true;
};

// 6. Raporlama Servisleri (Hatanın Çözümü Olan Kısım)
exports.getCompletedTasksCount = async () => {
  const tasks = readData();
  return tasks.filter(t => t.status === 'completed').length;
};

exports.getPendingTasksCount = async () => {
  const tasks = readData();
  return tasks.filter(t => t.status === 'pending').length;
};

exports.getSummaryReport = async () => {
  const tasks = readData();
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
};