const express = require('express');
const FavoritesService = require('../services/favorites-service');

function createFavoritesRouter() {
  
  
  const router = express.Router();
  const favoritoService = new FavoritesService();

  router.get('/', async (req, res, next) => {
    try {
      const favorites = await favoritoService.getFavorites();
      res.status(200).json({data: favorites,message: 'los favoritos se han devuelto con exito',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const favorite = await favoritoService.createFavorite(req.body);
      res.status(201).json({
        data: favorite,
        message: 'creado favoritos con exito',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:articleId', async (req, res, next) => {
    
    
    try {
      const favorite = await favoritoService.updateFavorite(req.params.articleId, req.body);
      res.status(200).json({
        data: favorite,
        message: 'favorito se ha actualizado con exito',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:articleId', async (req, res, next) => {
    try {
      const favorite = await favoritoService.deleteFavorite(req.params.articleId);
      res.status(200).json({
        data: favorite,
        message: 'favorito se ha borrado con exito',
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = { createFavoritesRouter };