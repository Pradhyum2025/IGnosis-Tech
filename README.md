# React Coding Exercise — Listings Manager (Final Submission)

Thank you for reviewing my solution for the **iGnosis Tech Engineering Team**. This README explains how to run the project, the decisions behind the implementation, and what I would improve with more time. My goal is to make the code easy to understand, predictable to run, and simple to evaluate.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js v22.x** (the project includes an `.nvmrc` file)
* **npm** (used for this solution)

### Installation & Setup

```bash
nvm use
npm install
# one-time MSW setup
npx msw init public --save
npm run dev
```

Then visit: **[http://localhost:5173](http://localhost:5173)**

> If you open `/products?...` directly in the browser, Vite will serve the main HTML file.
> To view actual API responses, check the DevTools → Network tab.

---

## 📌 About the Exercise

This project is a simple **Listings Manager** where you can:

* Browse products with pagination
* Search by name
* Filter by category
* Sort results
* View product details

The API is fully mocked using **MSW**, so everything works offline and the data is predictable.

---

## 🔗 Mock API Endpoints

These endpoints are intercepted by MSW:

* `GET /products?query=&category=&page=1&limit=10`
* `GET /products/:id`

The seed data is stored in `src/mocks/data/products.json`, and you can adjust the API behaviour through `src/mocks/handlers.ts`.

---

## 🌱 Environment Variables

The project uses one key variable:

```
VITE_API_BASE
```

* **Local development** → empty string (`""`) so MSW intercepts all requests
* **Production (Vercel)** → `/api` which allows Vercel to route through its serverless layer

This keeps both environments consistent without changing code.

---

## 🧠 Approach & Design Decisions

Here’s how I structured the solution:

### 📁 Code Organization

* **`useProducts`** and **`useProductDetails`** manage all data fetching using React Query.
* Pages focus only on displaying UI and handling user actions.
* Toolbar is custom-built to support search, filter, sorting, and pagination in a clean and compact layout.

### 🎨 UI & UX Decisions

* Kept spacing, grouping, and hierarchy simple and consistent.
* Included loading, empty, and error states to avoid sudden UI jumps.
* Made the layout fully responsive — mobile users get a clean, easy-to-reach toolbar.
* Used semantic HTML (`section`, `article`, `dl`) to improve accessibility.

### ⚙️ Technical Choices

* **React Query** for caching and background refetching
* **Client-side sorting** (simpler with MSW; API sorting would be ideal in a real backend)
* **TypeScript** for safety and cleaner maintenance

---

## 🔍 Trade-offs

* Stayed focused on the core requirements within the 3–4 hour timebox.
* Sorting happens on the client per page. A backend implementation would scale better.
* Avoided global state libraries because React Query was enough for this scope.

---

## 🌟 What I Would Improve with More Time

* Add a **table layout option** for dense admin workflows.
* More advanced filters: stock status, price range, multi-category.
* Preserve search/filter state in the URL for shareable views.
* Add optimistic updates for quick edits.
* Add subtle transitions or skeleton loaders.

---

## 🧪 Testing

Used **Vitest + React Testing Library** to verify:

* Products list rendering
* Search and filter interactions
* Pagination behaviour
* Product details loading and not-found case

MSW ensures the tests behave exactly like development mode.

---

## 📤 Submission

* The complete solution has been pushed to my personal GitHub repository.
* This README explains all instructions and design decisions clearly and simply.

Thank you for reviewing my submission. I'm happy to discuss anything in more detail!
