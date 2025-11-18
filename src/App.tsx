// ---------------------------------------------------------------------
// <copyright file="App.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProductList } from './features/products/ProductList'
import { ProductDetails } from './features/products/ProductDetails'
import { FaPlus } from "react-icons/fa6";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 ">

      {/* Header of website */}
      <header className="z-[1] sticky top-10 border-b border-slate-200 border-b-2 shadow bg-gradient-to-r from-indigo-100 to-blue-100 p-2 ">
        <div className="flex flex-row justify-between items-center    gap-4 pb-2 ">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-indigo-500 tracking-tight">Product Catalog</h1>
            <p className="text-slate-500 text-sm">Manage your inventory and view product details.</p>
          </div>
          <button
          title='Upcoming Feature'
           disabled={true}
           className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200 cursor-not-allowed opacity-80">
            <FaPlus />
            <span className='hidden lg:flex'>
            Add 
              </span> 
            <span className='hidden md:flex'>
            New Product
              </span> 
          </button>
        </div>
      </header>

      {/* Main div for Products */}
      <main className='p-2'>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  )
}
