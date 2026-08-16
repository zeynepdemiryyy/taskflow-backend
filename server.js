const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 TASKFLOW API Çalışıyor!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`=================================`);
});