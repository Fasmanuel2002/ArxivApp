const path = require('node:path');

require('dotenv').config({ quiet: true });

const config = {
  port: Number(process.env.PORT) || 3000,
  mongodbUri: process.env.MONGODB_URI || '',
  mongodbDbName: process.env.MONGODB_DB_NAME || 'arxiv_app',
  favoritesCollection: process.env.MONGODB_COLLECTION || 'favoritos',
  frontendDist:
    process.env.FRONTEND_DIST ||
    path.resolve(__dirname, '../../frontend/dist/ArxivApp/browser'),
};

module.exports = { config };
