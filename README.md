# EshopWeb

## Project Overview

ElectroHub is a scalable, reusable e-commerce starter application built with a React + Vite frontend and an Express backend. The repository now includes modular frontend pages, shared components, API service abstractions, and backend controllers/routes ready for future feature growth.

## Architecture

- Frontend: React + Vite
- Backend: Node.js + Express
- Database-ready design: modular services and controllers for easy migration to MongoDB Atlas
- Component-driven UI: reusable page and card components
- API layer: centralized `client/src/api/api.js` for server calls

## Folder Structure

- `client/src/components/` — reusable UI components
- `client/src/pages/` — route pages for home, products, and admin
- `client/src/api/` — frontend API service helpers
- `server/routes/` — Express route modules
- `server/controllers/` — request handlers
- `server/services/` — business logic helpers
- `server/data/` — example product dataset

## Run Locally

Install dependencies once from the workspace root:

```bash
npm install
```

Start the app in development mode:

```bash
npm run dev
```

This runs the backend on port `5000` and the Vite frontend on port `5173`.

## Build

```bash
npm run build
```

## Notes

The app is now structured for scalability and reuse. You can extend it by adding authentication, database integration, cart and order modules, and admin management features.
