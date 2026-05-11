const { ApiError } = require('../errors');
const { FavoritesRepository } = require('../repositories/favorites-repository');

const REQUIRED_FIELDS = ['id', 'title', 'summary', 'authors', 'published', 'updated'];
const OPTIONAL_STRING_FIELDS = [
  'pdfUrl',
  'primaryCategory',
  'doiUrl',
  'journalRef',
  'comment',
];

class FavoritesService {
  constructor(repository = new FavoritesRepository()) {
    this.repository = repository;
  }

  async getFavorites() {
    return this.repository.findAll();
  }

  async createFavorite(body) {
    const favorite = this.cleanFavorite(body);

    try {
      return await this.repository.create(favorite);
    } catch (error) {
      if (error.code === 11000) {
        throw new ApiError(409, 'El articulo ya esta guardado en favoritos.');
      }

      throw error;
    }
  }

  async updateFavorite(articleId, body) {
    const favorite = this.cleanFavorite({ ...body, id: articleId }, { partial: true });
    const updated = await this.repository.updateByArticleId(articleId, favorite);

    if (!updated) {
      throw new ApiError(404, 'No se encontro el articulo favorito.');
    }

    return updated;
  }

  async deleteFavorite(articleId) {
    const deleted = await this.repository.deleteByArticleId(articleId);

    if (!deleted) {
      throw new ApiError(404, 'No se encontro el articulo favorito.');
    }

    return { id: articleId };
  }

  cleanFavorite(body, { partial = false } = {}) {
    if (!body || typeof body !== 'object') {
      throw new ApiError(400, 'El cuerpo de la peticion debe ser un objeto.');
    }

    const missingFields = REQUIRED_FIELDS.filter((field) => {
      if (partial && field !== 'id') return false;
      return body[field] === undefined || body[field] === null || body[field] === '';
    });

    if (missingFields.length > 0) {
      throw new ApiError(400, `Faltan campos obligatorios: ${missingFields.join(', ')}.`);
    }

    const favorite = {};

    if (body.id !== undefined) favorite.id = this.cleanString(body.id, 'id');
    if (body.title !== undefined) favorite.title = this.cleanString(body.title, 'title');
    if (body.summary !== undefined) favorite.summary = this.cleanString(body.summary, 'summary');
    if (body.published !== undefined) {
      favorite.published = this.cleanString(body.published, 'published');
    }
    if (body.updated !== undefined) favorite.updated = this.cleanString(body.updated, 'updated');

    if (body.authors !== undefined) {
      if (!Array.isArray(body.authors) || body.authors.length === 0) {
        throw new ApiError(400, 'authors debe ser un array con al menos un autor.');
      }

      favorite.authors = body.authors.map((author) => this.cleanString(author, 'authors'));
    }

    if (body.categories !== undefined) {
      favorite.categories = Array.isArray(body.categories)
        ? body.categories.map((category) => this.cleanString(category, 'categories'))
        : [];
    }

    for (const field of OPTIONAL_STRING_FIELDS) {
      if (body[field] !== undefined && body[field] !== null && body[field] !== '') {
        favorite[field] = this.cleanString(body[field], field);
      }
    }

    return favorite;
  }

  cleanString(value, field) {
    if (typeof value !== 'string') {
      throw new ApiError(400, `${field} debe ser texto.`);
    }

    const text = value.trim();

    if (!text) {
      throw new ApiError(400, `${field} no puede estar vacio.`);
    }

    return text;
  }
}

module.exports = { FavoritesService };
