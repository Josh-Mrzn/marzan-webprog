# marzan-webprog

Lab Activity 7 — MERN-stack pet adoption platform.

```
marzan-webprog/
├── marzan-client/   # Vite + React 19 + MUI + Tailwind front-end
└── marzan-server/   # Express + MongoDB + JWT back-end
```

## Quick start

### 1. Backend

```bash
cd marzan-server
npm install
cp .env.example .env        # update MONGO_URI & JWT_SECRET
npm run seed                # optional: load demo users + articles
npm run dev                 # http://localhost:8000
```

Demo accounts (created by `npm run seed`):

| Role   | Email                       | Password    | Can sign in? |
| ------ | --------------------------- | ----------- | ------------ |
| admin  | `alicia.reyes@marzan.dev`   | `Alicia123!` | yes          |
| editor | `bianca.cruz@marzan.dev`    | `Bianca123!` | yes          |
| viewer | `marco.santos@marzan.dev`   | `Marco123!`  | **no** (Enhancement 1) |

### 2. Frontend

```bash
cd marzan-client
npm install --legacy-peer-deps   # MUI v9 / x-data-grid peer mismatch
cp .env.example .env             # VITE_API_URL=http://localhost:8000/api
npm run dev                      # http://localhost:5173
```

## Enhancements (per spec)

1. **Editors cannot access Users**, viewers cannot log in.
   – The Users nav item is hidden for editors and the route is guarded in `DashLayout`.
   – `loginUser` rejects viewers in `controllers/userController.js` and surfaces the
     error in the SignIn UI.
2. **DashArticleListPage** — full CRUD for articles, surfaced on the public
   `ArticleListPage` via `/api/articles`.
3. **SignUp works** — the form posts to `POST /api/users` and the new user can
   immediately log in (if `type !== 'viewer'`).
