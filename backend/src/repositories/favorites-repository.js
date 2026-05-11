const { config } = require('../config');
const { MongoConnection } = require('../db/mongo-client');

class FavoritesRepository {
  constructor({
    connection = new MongoConnection(),
    collectionName = config.favoritesCollection,
  } = {}) {
    this.connection = connection;
    this.collectionName = collectionName;
    this.indexReady = null;
  }

  async collection() {
    const db = await this.connection.db();
    const collection = db.collection(this.collectionName);

    if (!this.indexReady) {
      this.indexReady = collection.createIndex({ id: 1 }, { unique: true });
    }

    await this.indexReady;
    return collection;
  }

  toPublicFavorite(document) {
    if (!document) return null;
    const { _id, ...favorite } = document;
    return { ...favorite, _id: _id.toString() };
  }

  async findAll() {
    const collection = await this.collection();
    const favorites = await collection
      .find({})
      .sort({ createdAt: -1, title: 1 })
      .toArray();

    return favorites.map((favorite) => this.toPublicFavorite(favorite));
  }

  async create(favorite) {
    const collection = await this.collection();
    const now = new Date();
    const document = {
      ...favorite,
      createdAt: now,
      updatedAt: now,
    };
    const result = await collection.insertOne(document);

    return this.toPublicFavorite({ ...document, _id: result.insertedId });
  }

  async updateByArticleId(articleId, favorite) {
    const collection = await this.collection();
    const result = await collection.findOneAndUpdate(
      { id: articleId },
      { $set: { ...favorite, updatedAt: new Date() } },
      { returnDocument: 'after' },
    );

    return this.toPublicFavorite(result);
  }

  async deleteByArticleId(articleId) {
    const collection = await this.collection();
    const result = await collection.deleteOne({ id: articleId });
    return result.deletedCount === 1;
  }
}

module.exports = { FavoritesRepository };
