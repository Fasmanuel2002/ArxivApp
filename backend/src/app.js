const express = require('express');
const fs = require('node:fs');
const path = require('node:path');

const { config } = require('./config');
const { ApiError } = require('./errors');

const { errorHandler } = require('./middleware/error-handler');

const { createFavoritesRouter } = require('./routes/favorites-routes');
const FavoritesService = require('./services/favorites-service');

function createApp(){

    const app = express();

    const favoritesService = new FavoritesService();

    app.use(express.json());


    app.get('/api/status', (req, res) => {

        res.status(200).json({
            status: 'ok',
            mongodb: Boolean(config.mongodbUri),
        });

    });

    app.use(
        '/api/favoritos',
        createFavoritesRouter(favoritesService)
    );

    app.use('/api', (req, res, next) => {
        next(new ApiError(404, 'Ruta no encontrada'));
    });

    app.use('/arxiv', arxivProxy);
    const frontendDist = config.frontendDist;

    if(frontendDist){

        const indexPath = path.join(frontendDist, 'index.html');

        if(fs.existsSync(indexPath)){

            app.use(express.static(frontendDist));

            app.use((req, res, next) => {

                const wantsHtml = req.method === 'GET' && req.accepts('html');
                if(!wantsHtml){
                    return next();
                }
                return res.sendFile(indexPath);

            });

        }
    }
    app.use(errorHandler);

    return app;
}


async function arxivProxy(req, res, next){
    try {
        const pathWithQuery =
            req.originalUrl.replace(/^\/arxiv/, '') || '/';
        const target = new URL(
            pathWithQuery,
            'https://export.arxiv.org'
        );
        const response = await fetch(target);
        const body = Buffer.from(
            await response.arrayBuffer()
        );
       const contentType =
            response.headers.get('content-type');
        if(contentType){
            res.setHeader('content-type', contentType);
        }
        res.status(response.status).send(body);
    } catch (error) {

        next(new ApiError(502,'No se pudo conectar con Arxiv'));
    }
}

module.exports = { createApp };