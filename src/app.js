const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);
app.use('/reports', reportRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'TASKFLOW REST API Sistemine Hoş Geldiniz! 🚀',
    docs: 'API kullanımı için /docs dizinindeki dokümanları inceleyebilirsiniz.',
    endpoints: {
      tasks: '/tasks',
      reports: '/reports'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Aradığınız endpoint bulunamadı.' });
});

module.exports = app;