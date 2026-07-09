## Run

Development:

```bash
npm run dev
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
- `GET /books/author/:authorId`
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
