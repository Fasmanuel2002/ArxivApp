const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const { config } = require('./config');
const { ApiError } = require('./errors');
const { errorHandler } = require('./middleware/error-handler');
const { createFavoritesRouter } = require('./routes/favorites-routes');
const { FavoritesService } = require('./services/favorites-service');

function createApp({
  favoritesRepository,
  favoritesService,
  frontendDist = config.frontendDist,
  enableArxivProxy = true,
} = {}) {
  const app = express();
  const service =
    favoritesService ||
    new FavoritesService(favoritesRepository);

  app.use(express.json({ limit: '1mb' }));

  app.get('/api/status', (req, res) => {
    res.status(200).json({
      data: {
        status: 'ok',
        mongodbConfigured: Boolean(config.mongodbUri),
      },
      message: 'API funcionando correctamente',
    });
  });

  app.use('/api/favoritos', createFavoritesRouter(service));
  app.use('/api', (req, res, next) => {
    next(new ApiError(404, 'Ruta de API no encontrada.'));
  });

  if (enableArxivProxy) {
    app.use('/arxiv', arxivProxy);
  }

  configureStaticFrontend(app, frontendDist);
  app.use(errorHandler);

  return app;
}

function configureStaticFrontend(app, frontendDist) {
  if (!frontendDist) return;

  const indexPath = path.join(frontendDist, 'index.html');

  if (!fs.existsSync(indexPath)) {
    app.get('/', (req, res) => {
      res.status(200).json({
        data: {
          status: 'ok',
          frontendDist,
        },
        message: 'Backend listo. Ejecuta npm run build:frontend para servir Angular.',
      });
    });
    return;
  }

  app.use(
    express.static(frontendDist, {
      index: false,
      maxAge: '1y',
      redirect: false,
    }),
  );

  app.use((req, res, next) => {
    const wantsHtml =
      (req.method === 'GET' || req.method === 'HEAD') && req.accepts('html');

    if (!wantsHtml) {
      return next();
    }

    return res.sendFile(indexPath);
  });
}

async function arxivProxy(req, res, next) {
  try {
    const pathWithQuery = req.originalUrl.replace(/^\/arxiv/, '') || '/';
    const target = new URL(pathWithQuery, 'https://export.arxiv.org');
    const response = await fetch(target, {
      method: req.method,
      headers: {
        accept: req.headers.accept || 'application/atom+xml, application/xml, text/xml',
        'user-agent': 'ArxivApp/1.0',
      },
    });
    const contentType = response.headers.get('content-type');
    const body = Buffer.from(await response.arrayBuffer());

    if (contentType) {
      res.setHeader('content-type', contentType);
    }

    res.status(response.status).send(body);
  } catch (error) {
    next(new ApiError(502, `No se pudo consultar ArXiv: ${error.message}`));
  }
}

module.exports = { createApp };
