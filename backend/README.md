# Backend ArXiv App

Servidor Node/Express para guardar favoritos de ArXiv en MongoDB Atlas.

## MongoDB Atlas

1. Crea un cluster en MongoDB Atlas.
2. En `Network Access`, permite `0.0.0.0/0` para aceptar conexiones desde cualquier IP.
3. Copia la cadena de conexion que tambien puedes usar en MongoDB Compass.
4. Crea `backend/.env` tomando como base `backend/.env.example`.

## Scripts

- `npm run dev`: servidor Express en desarrollo.
- `npm run build:frontend`: compila Angular.
- `npm start`: sirve la API y el build de Angular desde un unico servidor Express.
- `npm test`: pruebas de la API sin depender de Atlas.

## Endpoints

- `GET /api/status`
- `GET /api/favoritos`
- `POST /api/favoritos`
- `PUT /api/favoritos/:articleId`
- `DELETE /api/favoritos/:articleId`
