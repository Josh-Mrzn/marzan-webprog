# marzan-server

Express + MongoDB backend for Lab Activity 7.

## Setup

```bash
cd marzan-server
npm install
cp .env.example .env   # then update MONGO_URI / JWT_SECRET
npm run seed           # optional — populate users & articles
npm run dev
```

## Endpoints

| Method | URL                          | Purpose                       |
| ------ | ---------------------------- | ----------------------------- |
| GET    | `/api/users`                 | List users (no password)      |
| POST   | `/api/users`                 | Create user (SignUp)          |
| PUT    | `/api/users/:id`             | Update user                   |
| DELETE | `/api/users/:id`             | Delete user                   |
| POST   | `/api/users/login`           | Login (admin / editor only)   |
| GET    | `/api/articles`              | List articles                 |
| GET    | `/api/articles/slug/:slug`   | Get article by slug           |
| POST   | `/api/articles`              | Create article                |
| PUT    | `/api/articles/:id`          | Update article                |
| DELETE | `/api/articles/:id`          | Delete article                |

Default port: **8000** (configurable via `.env`).
