# ArXiv App
Aplicacion Angular + Node/Express para buscar articulos en ArXiv y guardar favoritos en MongoDB Atlas.
## API REST

- `GET /api/status`
- `GET /api/favoritos`
- `POST /api/favoritos`
- `PUT /api/favoritos/:articleId`
- `DELETE /api/favoritos/:articleId`


## Ejecucion

Instalar dependencias:

```bash
cd backend && npm install
cd ../frontend && npm install
```

Desarrollo:

```bash
cd backend
npm run dev
```

En otra terminal:

```bash
cd frontend
npm start
```

Produccion local en un unico servidor:

```bash
cd backend
npm run build:frontend
npm start
```

La aplicacion queda disponible en `http://localhost:3000`.
