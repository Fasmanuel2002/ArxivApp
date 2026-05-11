const { MongoClient } = require('mongodb');
const { config } = require('../config');
const { ApiError } = require('../errors');

class MongoConnection {
  constructor(uri = config.mongodbUri, dbName = config.mongodbDbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = null;
    this.connection = null;
  }

  async db() {
    if (!this.uri) {
      throw new ApiError(
        503,
        'Falta MONGODB_URI. Crea backend/.env con la cadena de MongoDB Atlas.',
      );
    }

    if (!this.connection) {
      this.client = new MongoClient(this.uri);
      this.connection = this.client.connect();
    }

    const client = await this.connection;
    return client.db(this.dbName);
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.connection = null;
    }
  }
}

module.exports = { MongoConnection };
