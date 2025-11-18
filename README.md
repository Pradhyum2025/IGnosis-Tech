# React Coding Exercise — Listings Manager

Thank you for your interest in joining the **iGnosis Tech Engineering Team**.  
This repository contains a coding exercise used in our recruitment process for frontend engineering roles.

Please complete the exercise below, upload your code to a **personal GitHub repository**, and share the link with us.  

⚠️ **Important:** Please **do not fork this repository**. Forks on GitHub are public and may expose your solution to other candidates.  
Instead, download or clone the repo locally, then push your solution to a new repository in your own account.

---

## Prerequisites

- **Node.js v22.x** (repo ships with `.nvmrc`, run `nvm use`)  
- **Yarn**

---

## Getting Started

~~~bash
nvm use
yarn install
# one-time setup for MSW
npx msw init public --save
yarn dev
~~~

Open http://localhost:5173 in your browser.

> Note: Navigating directly to `/products?...` in the address bar will return the SPA’s HTML.  
> Use DevTools → Network → Fetch/XHR (or `fetch('/products')` in the console) to view the mocked JSON responses.

---

## 📌 Coding Exercise

You will build a small **Listings Manager** for products (think simple marketplace admin).  
A minimal API is mocked using **MSW** so the app runs offline and tests are deterministic.

The list and toolbar are intentionally unimplemented. Build the structure and styling you think is appropriate.

When the starter runs, you’ll see placeholder notes on the Products and Details pages. Replace them as you implement the UI and data flow.


### Timebox

Please spend **no more than 3–4 hours** on this exercise.  
Focus on the **core requirements first**. We are more interested in how you approach the problem than in feature completeness.  

Completing all core requirements is considered a strong submission.

---

### 🎯 Core Requirements

- **Product List**
  - Display a **paginated list** of products.
  - Each product shows: name, price, category, and stock status.
  - Sorting (by price, name, etc.)
- **Product Details**
  - Allow users to view details of a product on a separate route (or modal).
- **Search & Filter**
  - Provide search by product name.
  - Allow filtering by category.
- **States**
  - Handle loading, empty, and error states gracefully.
- **Accessibility**
  - Implement search, filter, and pagination controls with accessible markup (labels, roles, keyboard navigation).

👉 The structure for the toolbar (search, filter, sort) is **intentionally not provided** — please design and implement this yourself (you may use component libraries).

---

## 🔗 API (Mocked with MSW)

The mock server provides these endpoints:

- `GET /products?query=&category=&page=1&limit=10`  
- `GET /products/:id`  

Seed data is in `src/mocks/data/products.json`.  
You can adjust mock behavior in `src/mocks/handlers.ts`.

---

### Environment Variables

The app reads `VITE_API_BASE` to decide which base path to use for API calls.  
The included `.env` sets `VITE_API_BASE=""` for local MSW interception, while `.env.production`
sets `VITE_API_BASE="/api"` for Vercel so requests proxy through `/api/*`.

---

## ✅ What We Evaluate

- **Code quality & structure** — components, hooks, state management, TypeScript hygiene  
- **UX & product thinking** — sensible defaults, empty/loading/error states, responsiveness, accessibility  
- **UI skills** — how you design and implement the search/filter/sorting controls without a prebuilt scaffold  
- **Testing** — provide at least a couple of meaningful tests that demonstrate your testing approach  
- **Communication** — notes in your README about design decisions, trade-offs, and what you’d do with more time  

---

## 📤 Submission Instructions

1. Complete the exercise.  
2. Push your solution to a **personal GitHub repo** (do not fork this one).  
3. Share the repository link through the Google Form (please check your email)

---

## Solution Notes

### Design Decisions
- Separated data fetching into `useProducts` and `useProductDetails` so list and details pages stay lean and focus on UI concerns.
- Product list uses a compact toolbar grid plus card layout to keep controls reachable on mobile while still supporting search, category filtering, sorting, and pagination.
- Product details reuses the same visual language (rounded containers, brand accents) and relies on semantic landmarks (`section`, `article`, `dl`) for better accessibility.

### Trade-offs
- React Query handles caching and stale data logic; Redux or another global store felt unnecessary for this small surface and would add boilerplate.
- Sorting currently happens client-side after each page loads. Moving sorting to the API would avoid extra work on the client, but MSW mocks kept the implementation simple.

### Improvements with More Time
- Add column-based layout variant for the list so dense data-entry tasks can switch between cards and tables.
- Support multi-select filters (e.g., stock status, price ranges) and persist toolbar state in the URL for sharable views.
- Enhance animations/skeletons and introduce optimistic UI for quick stock toggles or edits.

### Testing Approach
- Vitest + React Testing Library verify critical user flows: list rendering, search/filter interactions, and loading product details—including the not-found branch.
- MSW keeps tests close to production behavior by exercising the same mocked endpoints used in development.