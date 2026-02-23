## Blog Platform

A modern full‑stack blog platform consisting of a React/Vite frontend and a Node.js/Express TypeScript API.  
It supports creating, editing and deleting posts, basic analytics, and lightweight authentication backed by JSON files.

### Features

- **Dashboard overview**
  - Total posts and unique authors
  - Latest activity based on recent posts
- **Blog management**
  - Create, read, update and delete blog posts
  - Paginated listing (with client‑side paging)
  - Sorting by creation date (newest first)
- **Auth (simple demo implementation)**
  - Sign up and login via email/password
  - User data stored in a local JSON file
  - Session persisted on the frontend via `localStorage`
- **Modern UI**
  - React 18 + Vite + TypeScript + Tailwind CSS
  - Responsive layout with dashboard, listing, detail and form pages
- **API layer**
  - REST endpoints for posts (`/api/posts`)
  - REST endpoints for auth (`/api/auth`)
  - File‑based JSON storage for both posts and users

### Project structure

```text
blog-frontend/   React + Vite + TypeScript SPA for the admin/dashboard UI
blog-api/        Node.js + Express + TypeScript API (file-based JSON storage)
```

- **`blog-frontend`**
  - `src/pages` – route pages (dashboard, listing, post detail, post form, login/signup, etc.)
  - `src/components` – reusable UI components (cards, skeletons, empty/error states, header, layout, etc.)
  - `src/context` – auth context with `localStorage` persistence
  - `src/services/api.ts` – client for the posts API (`/api/posts`)
  - `vite.config.ts` – Vite configuration, including dev‑time proxy to the API
- **`blog-api`**
  - `src/server.ts` – starts the HTTP server on port `3000` and mounts routes
  - `src/app.ts` – Express app configuration and post routes under `/api/posts`
  - `src/routes` – Express routers for posts and auth
  - `src/controllers` – request/response handling (mapping HTTP to services)
  - `src/services` – post and auth business logic
  - `src/models` – TypeScript interfaces for posts
  - `src/storage` – file‑based storage utilities (JSON files under `data/`)
  - `data/posts.json`, `data/users.json` – on‑disk storage for posts and users

### Tech stack

- **Frontend**
  - React 18
  - Vite 5
  - TypeScript
  - React Router
  - Tailwind CSS
  - lucide‑react (icons)
- **Backend**
  - Node.js + Express
  - TypeScript
  - `bcryptjs` for password hashing
  - `uuid` for user IDs
  - File‑based JSON persistence (no external database required)

### Prerequisites

- **Node.js**: version 18 or newer is recommended
- **npm** (or another Node package manager such as pnpm/yarn)

### Getting started

#### 1. Clone the repository

```bash
git clone <https://github.com/KomalGoel18/Blog_Platform>
cd "Blog_Platform"
```

#### 2. Start the API (`blog-api`)

In one terminal:

```bash
cd blog-api
npm install
npm run dev
```

This starts the Express API on `http://localhost:3000`.

#### 3. Start the frontend (`blog-frontend`)

In a second terminal:

```bash
cd blog-frontend
npm install
npm run dev
```

By default Vite runs on `http://localhost:5173`.  
The dev server is configured to proxy `/api` requests to `http://localhost:3000` (see `vite.config.ts`), so the frontend can call the API without additional configuration.

### Available scripts

#### `blog-frontend`

- **`npm run dev`**: start the Vite dev server
- **`npm run build`**: create a production build
- **`npm run preview`**: preview the production build locally
- **`npm run lint`**: run ESLint
- **`npm run typecheck`**: run TypeScript type checking

#### `blog-api`

- **`npm run dev`**: start the API in watch mode with `ts-node-dev`
- **`npm run build`**: compile TypeScript to JavaScript
- **`npm run start`**: run the compiled server from `dist/server.js`
- **`npm run test`**: run the Jest test suite

### API overview

#### Posts

Base URL: `/api/posts`

- **GET `/api/posts`**
  - Returns a list of posts.
  - Supports query parameters such as `page`, `limit`, `search`, and `author` (used by the frontend).
- **GET `/api/posts/:id`**
  - Returns a single post by numeric `id`.
- **POST `/api/posts`**
  - Creates a new post.
  - Expects JSON body with at least `title` and `content` (and optional `author`).
- **PUT `/api/posts/:id`**
  - Updates an existing post’s `title` and/or `content`.
- **DELETE `/api/posts/:id`**
  - Deletes a post by `id`.

#### Auth

Base URL: `/api/auth`

- **POST `/api/auth/signup`**
  - Body: `{ "name": string, "email": string, "password": string }`
  - Creates a new user with a hashed password and stores it in `data/users.json`.
- **POST `/api/auth/login`**
  - Body: `{ "email": string, "password": string }`
  - Verifies the credentials against stored users.
  - Returns basic user information if successful.

### Data storage

- Posts are stored in `blog-api/data/posts.json`.
- Users are stored in `blog-api/data/users.json`.
- Both are simple JSON files manipulated through the services and storage utilities.
