## Blog Platform

A full-stack blog management platform with a TypeScript/Express API and a React + Vite + Tailwind frontend. It lets you create, list, view, edit, and delete blog posts, with a dashboard-style UI and a basic JWT authentication flow that is being wired in.

---

## Tech Stack

- **Backend**
  - Node.js, **Express 5** with **TypeScript**
  - In-memory / JSON-file data store for posts and users
  - JSON Web Tokens (**JWT**) for authentication
  - Jest + Supertest for testing

- **Frontend**
  - **React 18** + **Vite 5** + **TypeScript**
  - **React Router** for routing
  - **Tailwind CSS** for styling
  - `lucide-react` for icons

---

## Project Structure

- **`blog-api/`** – Express API for posts and auth
  - `src/app.ts` – Express app setup, JSON middleware, mounts post routes and error middleware
  - `src/server.ts` – Starts the HTTP server on port `3000`, mounts `/api/auth` routes
  - `src/routes/post.routes.ts` – RESTful routes under `/api/posts`
  - `src/auth/auth.routes.ts` – Auth routes under `/api/auth` (`POST /signup`, `POST /login`)
  - `src/utils/jwt.ts` – JWT sign/verify helpers
  - `data/posts.json` – JSON “database” for blog posts
  - `data/users.json` – JSON “database” for user accounts

- **`blog-frontend/`** – React dashboard-style client
  - `src/main.tsx` – React entrypoint, wraps `App` with `AuthProvider`
  - `src/App.tsx` – Declares routes (public auth pages + protected app)
  - `src/context/AuthContext.tsx` – Simple auth context with localStorage persistence
  - `src/layouts/ProtectedLayout.tsx` – Guards routes that require authentication and renders `Header`
  - `src/components/Header.tsx` – Top navigation, search, notifications, and user menu
  - `src/components/PostCard.tsx`, `EmptyState.tsx`, `SkeletonCard.tsx`, `ErrorState.tsx` – UI building blocks for posts and API states
  - `src/pages/` – Main screens:
    - `DashboardPage.tsx` – High-level stats (total posts, authors, last activity)
    - `BlogListingPage.tsx` – Paginated post listing, search, create button
    - `BlogPostPage.tsx` – Detailed view of a single post with edit/delete actions
    - `PostFormPage.tsx` – Create/edit post form (wired to the posts API)
    - `AnalyticsPage.tsx` – Placeholder for analytics
    - `SettingsPage.tsx` – Placeholder for account/settings
    - `LoginPage.tsx`, `SignupPage.tsx`, `ResetPasswordPage.tsx` – Auth-related forms/flows (UI mostly; wiring to API in progress)
  - `src/services/api.ts` – Client for `/api/posts` (list, get, create, update, delete)
  - `src/services/auth.ts` – Client for `/api/auth` (`signup`, `login`) using `VITE_API_BASE_URL`
  - `vite.config.ts` – Vite dev server config with a proxy for `/api` to `http://localhost:3000`

---

## Features

- **Blog posts**
  - List all posts with pagination, search, and author filtering
  - View post details with rich layout and metadata
  - Create new posts
  - Edit existing posts
  - Delete posts (with confirmation)

- **Dashboard**
  - Summary metrics: total posts, unique authors, last activity
  - Uses the posts API to derive stats

- **API response UX**
  - Dedicated `PostsShowcasePage` demonstrating:
    - Skeleton loading state
    - Empty state with CTA to create the first post
    - Error state with retry handling

- **Authentication**
  - Backend endpoints for `POST /api/auth/signup` and `POST /api/auth/login`
  - JWT utilities for issuing and verifying tokens
  - Frontend `AuthContext` with `login`/`logout` and localStorage persistence
  - UI for login, signup, and reset-password flows
  - `ProtectedLayout` that redirects unauthenticated users to `/login`

> **Note**: Some auth wiring (e.g. calling `auth.ts` from the form pages, protected API calls using the token, and a full `auth.middleware`) is still being connected; treat this as a work-in-progress.

---

## Getting Started

### Prerequisites

- **Node.js** 18+ recommended
- **npm** (bundled with Node)

---

## Backend – `blog-api`

### Install dependencies

```bash
cd blog-api
npm install
```

### Run in development

```bash
npm run dev
```

This will start the API on `http://localhost:3000`.

### Build and run in production mode

```bash
npm run build
npm start
```

### Test

```bash
npm test
```

### API Overview

Base URL (dev): `http://localhost:3000`

- **Posts**
  - `GET /api/posts` – List posts (supports `page`, `limit`, `search`, `author` query params)
  - `GET /api/posts/:id` – Get a single post by ID
  - `POST /api/posts` – Create a post
  - `PUT /api/posts/:id` – Update a post
  - `DELETE /api/posts/:id` – Delete a post

- **Auth**
  - `POST /api/auth/signup` – Create a new user
  - `POST /api/auth/login` – Log in and receive a JWT

Posts and users are stored in `data/posts.json` and `data/users.json` respectively, which the API reads and writes as a lightweight JSON “database”.

---

## Frontend – `blog-frontend`

### Install dependencies

```bash
cd blog-frontend
npm install
```

### Environment variables

Create a `.env` file in `blog-frontend` (or `.env.local`) with:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

This is used by `src/services/auth.ts` for auth requests. Requests to `/api/posts` are proxied by Vite to the backend (see `vite.config.ts`).

### Run in development

```bash
cd blog-frontend
npm run dev
```

Vite will start the app (by default on `http://localhost:5173`). With the proxy and `VITE_API_BASE_URL` set, the frontend can talk to the backend at `http://localhost:3000`.

### Build for production

```bash
npm run build
```

To preview a production build locally:

```bash
npm run preview
```

---

## How the Pieces Fit Together

- The **frontend** uses:
  - `ApiService` to call `/api/posts` for listing, detail view, creation, editing, and deletion.
  - `auth.ts` to call `/api/auth/signup` and `/api/auth/login` (intended to be wired into the auth forms).
  - `AuthContext` + `ProtectedLayout` to gate the main app behind login.
- The **backend**:
  - Exposes `/api/posts` and `/api/auth` off the same Express app.
  - Uses JSON files for persistence to keep the project simple and self-contained.

Run both servers (API and frontend) simultaneously to get a full-stack blog platform with a dashboard-style UI.

---

## Future Improvements

- Wire the login/signup/reset-password UI to the real auth API and `AuthContext`
- Implement and enable an `auth.middleware` to protect selected API routes with JWTs
- Replace JSON file storage with a real database (e.g. Postgres, MongoDB, SQLite)
- Add role-based permissions for content management
- Expand analytics and settings pages with real data and configuration

>>>>>>> d743a9f (Added README)
