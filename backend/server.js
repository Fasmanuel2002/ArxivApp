const { createApp } = require('./src/app');
const { config } = require('./src/config');

const app = createApp();
const server = app.listen(config.port, () => {
  console.log(`Servidor escuchando en http://localhost:${config.port}`);
});

module.exports = server;
