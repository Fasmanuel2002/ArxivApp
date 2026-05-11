const assert = require('node:assert/strict');
const { describe, it } = require('node:test');
const { createApp } = require('../src/app');

function createMemoryRepository() {
  const favorites = new Map();

  return {
    async findAll() {
      return [...favorites.values()];
    },
    async create(favorite) {
      if (favorites.has(favorite.id)) {
        const error = new Error('duplicate key');
        error.code = 11000;
        throw error;
      }

      const saved = {
        ...favorite,
        _id: String(favorites.size + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      favorites.set(favorite.id, saved);
      return saved;
    },
    async updateByArticleId(articleId, favorite) {
      const current = favorites.get(articleId);
      if (!current) return null;

      const saved = {
        ...current,
        ...favorite,
        id: articleId,
        updatedAt: new Date(),
      };
      favorites.set(articleId, saved);
      return saved;
    },
    async deleteByArticleId(articleId) {
      return favorites.delete(articleId);
    },
  };
}

function createFavorite(overrides = {}) {
  return {
    id: 'https://arxiv.org/abs/2401.00001',
    title: 'A useful paper',
    summary: 'Paper summary',
    authors: ['Ada Lovelace'],
    published: '2024-01-01T00:00:00Z',
    updated: '2024-01-02T00:00:00Z',
    ...overrides,
  };
}

async function withServer(testBody) {
  const app = createApp({
    favoritesRepository: createMemoryRepository(),
    frontendDist: null,
    enableArxivProxy: false,
  });
  const server = app.listen(0);
  const { port } = server.address();

  try {
    await testBody(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

describe('favorites API', () => {
  it('creates, lists and deletes a favorite', async () => {
    await withServer(async (baseUrl) => {
      const created = await fetch(`${baseUrl}/api/favoritos`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(createFavorite()),
      });

      assert.equal(created.status, 201);
      const createdBody = await created.json();
      assert.equal(createdBody.data.id, 'https://arxiv.org/abs/2401.00001');

      const listed = await fetch(`${baseUrl}/api/favoritos`);
      const listedBody = await listed.json();
      assert.equal(listed.status, 200);
      assert.equal(listedBody.data.length, 1);

      const deleted = await fetch(
        `${baseUrl}/api/favoritos/${encodeURIComponent(createdBody.data.id)}`,
        { method: 'DELETE' },
      );
      assert.equal(deleted.status, 200);

      const listedAgain = await fetch(`${baseUrl}/api/favoritos`);
      const listedAgainBody = await listedAgain.json();
      assert.equal(listedAgainBody.data.length, 0);
    });
  });

  it('rejects duplicate favorites', async () => {
    await withServer(async (baseUrl) => {
      const favorite = createFavorite();

      await fetch(`${baseUrl}/api/favoritos`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(favorite),
      });

      const duplicated = await fetch(`${baseUrl}/api/favoritos`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(favorite),
      });

      assert.equal(duplicated.status, 409);
    });
  });

  it('validates required favorite fields', async () => {
    await withServer(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/favoritos`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title: 'Incomplete' }),
      });

      const body = await response.json();
      assert.equal(response.status, 400);
      assert.match(body.message, /Faltan campos obligatorios/);
    });
  });
});
