# Backend Task API

Production-quality REST backend built with Node.js, Express, PostgreSQL, Prisma, JWT, bcrypt, Redis, Multer, Sharp, dotenv, and Zod.

## Project Structure

```text
backend-task/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── prisma/
│   ├── utils/
│   ├── validators/
│   ├── uploads/
│   ├── app.js
│   └── server.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── package.json
├── README.md
└── postman_collection.json
```

## Requirements

- Node.js 20 or newer
- PostgreSQL
- Redis

## Setup

```bash
cd backend/backend-task
npm install
cp .env.example .env
```

Update `.env` with your PostgreSQL and Redis connection details.

## Environment Variables

```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/backend_task?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN="1h"
REDIS_URL="redis://localhost:6379"
PORT=3000
RATE_LIMIT_WINDOW_SECONDS=60
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_MEMORY_FALLBACK=true
UPLOAD_MAX_FILE_SIZE_MB=5
NODE_ENV="development"
```

## Database

Create the database:

```bash
createdb backend_task
```

Run Prisma migration and generate Prisma Client:

```bash
npm run prisma:migrate
npm run prisma:generate
```

For production deployments:

```bash
npm run prisma:deploy
```

## Redis

Run Redis locally:

```bash
redis-server
```

Or with Docker:

```bash
docker run --name backend-task-redis -p 6379:6379 -d redis:7
```

Protected write APIs use a Redis-backed rate limiter:

- Window: `RATE_LIMIT_WINDOW_SECONDS`
- Max requests: `RATE_LIMIT_MAX_REQUESTS`
- Identity: authenticated `req.user.userId`
- Local development fallback: `RATE_LIMIT_MEMORY_FALLBACK=true` lets protected APIs keep working if Redis is not running. Set it to `false` in production.

## Run

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Health check:

```bash
GET /health
```

## Response Format

Success:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

## Authentication

Register:

```http
POST /register
Content-Type: application/json

{
  "username": "john",
  "email": "john@example.com",
  "password": "Password123!"
}
```

Login:

```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123!"
}
```

Use the returned token on protected APIs:

```http
Authorization: Bearer <token>
```

JWT payload includes:

- `userId`
- `role`

Default expiry is `1h`.

## API List

Authentication:

- `POST /register`
- `POST /login`

Authors:

- `GET /authors`
- `GET /authors/:id`
- `POST /authors` protected
- `PUT /authors/:id` protected
- `DELETE /authors/:id` protected

Books:

- `GET /books`
- `GET /books/:id`
- `POST /books` protected
- `PUT /books/:id` protected
- `DELETE /books/:id` protected

Upload:

- `POST /upload` protected, multipart form-data with `image` field

## Sample Requests

Create author:

```http
POST /authors
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Austen",
  "email": "jane.austen@example.com"
}
```

Create book:

```http
POST /books
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Pride and Prejudice",
  "description": "A classic novel of manners.",
  "price": 19.99,
  "authorId": 1
}
```

Upload image:

```http
POST /upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

image=<file>
```

Images are validated, limited to 5 MB by default, resized to max width 1200 px, compressed to WebP, and stored in `src/uploads`.

## Postman

Import `postman_collection.json` into Postman. The collection includes a `baseUrl` variable and bearer token variable. Run `Login`, then copy the returned token into the `token` collection variable.
