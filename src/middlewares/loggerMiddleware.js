const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, url } = req;
  const logMessage = `[${timestamp}] ${method} ${url}\n`;

  console.log(`\x1b[36m[LOGGER]\x1b[0m ${method} ${url} - ${timestamp}`);

  fs.appendFile(path.join(logDirectory, 'app.log'), logMessage, (err) => {
    if (err) console.error('Log dosyasına yazılamadı:', err);
  });

  next();
};

module.exports = loggerMiddleware;
