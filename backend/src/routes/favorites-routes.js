const express = require('express');
const { FavoritesService } = require('../services/favorites-service');

function createFavoritesRouter(service = new FavoritesService()) {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      const favorites = await service.getFavorites();
      res.status(200).json({
        data: favorites,
        message: 'favoritos devueltos con exito',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const favorite = await service.createFavorite(req.body);
      res.status(201).json({
        data: favorite,
        message: 'favorito creado con exito',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:articleId', async (req, res, next) => {
    try {
      const favorite = await service.updateFavorite(req.params.articleId, req.body);
      res.status(200).json({
        data: favorite,
        message: 'favorito actualizado con exito',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:articleId', async (req, res, next) => {
    try {
      const favorite = await service.deleteFavorite(req.params.articleId);
      res.status(200).json({
        data: favorite,
        message: 'favorito borrado con exito',
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = { createFavoritesRouter };
