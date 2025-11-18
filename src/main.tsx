// ---------------------------------------------------------------------
// <copyright file="main.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './reset.css'
import Page from './app/Dashboard/page'
import { ProductModal } from './component/ProductModal'
import NaviagteToDashBoard from './component/NaviagateToDashBoard'

const queryClient = new QueryClient()

async function boot() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      serviceWorker: { url: '/mockServiceWorker.js' },
      onUnhandledRequest: 'warn'
    })

    console.info('[MSW] worker started')
    console.info(
      '[Starter] Open DevTools → Console and run:',
      "await (await fetch('/products?page=1&limit=8')).json()"
    )
  }


  const router = createBrowserRouter([
  {
    path : "/",
    element: <NaviagteToDashBoard/>
  },
  {
    path: "/products",
    element: <Page />,
    children: [
      { path: "/products", element: <App/> },
      { path: "/products/:id", element: <ProductModal/> },
    ]

  }
]);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  )
}




boot()
