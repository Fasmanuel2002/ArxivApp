# ArXiv App

Aplicacion Angular + Node/Express para buscar articulos en ArXiv y guardar favoritos en MongoDB Atlas.

## Que incluye

- Cliente Angular para buscar articulos y gestionar favoritos.
- Servidor Node/Express con API REST.
- Integracion en un unico servidor: Express sirve la API y el build de Angular.
- MongoDB Atlas como base de datos.
- Insercion, borrado y modificacion de favoritos.

## API REST

- `GET /api/status`
- `GET /api/favoritos`
- `POST /api/favoritos`
- `PUT /api/favoritos/:articleId`
- `DELETE /api/favoritos/:articleId`

## Configuracion de MongoDB Atlas

1. Crear un cluster en MongoDB Atlas.
2. Crear un usuario de base de datos.
3. En `Network Access`, anadir `0.0.0.0/0` para permitir conexiones desde cualquier IP.
4. Copiar la cadena de conexion. Es la misma que se puede pegar en MongoDB Compass.
5. Crear `backend/.env` a partir de `backend/.env.example` y completar `MONGODB_URI`.

Ejemplo:

```env
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:CLAVE@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=ArxivApp
MONGODB_DB_NAME=arxiv_app
MONGODB_COLLECTION=favoritos
```

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

## Pruebas

```bash
cd backend && npm test
cd ../frontend && npm test -- --watch=false
cd ../frontend && npm run build
```
