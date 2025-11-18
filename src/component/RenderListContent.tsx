// ---------------------------------------------------------------------
// <copyright file="RenderListContent.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from "react"
import { Button } from "../components/ui/button"
import { SkeletonCard } from "./SkeletonCard"
import { Product } from "../types"
import { ProductCard } from "./ProductCard"


const PAGE_LIMIT = 10
type ListRendererProps = {
  isPending: boolean
  isError: boolean
  errorMessage: string
  products: Product[]
  onRetry: () => void
}

export default function renderListContent({ isPending, isError, errorMessage, products, onRetry }: ListRendererProps) {

  //Modal State
   const [modalData,setModalData] = React.useState<Product|null>(null);
    
  //  Show modal
   const handleShowModal = (product:Product)=>{
      setModalData(()=>product);
    }

    // close Modal
    const handleCloseModal = ()=>{
      setModalData(()=>null);
    }



  if (isPending) {


    return (
      <ul className="grid gap-4 md:grid-cols-3" aria-label="Loading products">
        {Array.from({ length: PAGE_LIMIT }).map((_, index) => (
          <li key={index}>
            <SkeletonCard />
          </li>
        ))}
      </ul>
    )
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      >
        <p className="font-medium">We couldn&apos;t load products.</p>
        <p className="mt-1">{errorMessage}</p>
        <Button
          type="button"
          onClick={() => onRetry()}
          variant="outline"
          className="mt-3 border-red-300 text-red-700 hover:bg-red-100"
        >
          Try again
        </Button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div
        className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500"
        data-testid="empty-state"
      >
        <p className="font-medium text-slate-700">No products match your filters.</p>
        <p className="mt-1 text-slate-500">Adjust the search or pick a different category to keep exploring.</p>
      </div>
    )
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="products-list">
      {products.map(product => (
        <li key={product.id}>
          <ProductCard product={product} onClick={handleShowModal} />
        </li>
      ))}
      {/* {modalData?<ProductModal product={modalData} onClose={handleCloseModal}/>:null} */}
    </ul>
  )
}
