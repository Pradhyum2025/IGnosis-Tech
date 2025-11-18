// ---------------------------------------------------------------------
// <copyright file="ProductModal.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { Product } from "../types";
import { Badge } from "./Badge";
import { FaRegImage } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { formatCurrency } from "../features/products/formatCurrency";
import { useProductDetails } from "../features/products/useProducts";
import { useNavigate } from "react-router-dom";



export const ProductModal: React.FC = () => {


  const { data, isPending, isError, error, refetch } = useProductDetails("p-2")
  const [showSkeleton, setShowSkeleton] = useState(true);
  
  const navigate = useNavigate();

  //close
  const onClose = ()=>{
    navigate("/");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(isPending);
    }, 400); 

    return () => clearTimeout(timer);
  }, [isPending]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          title="Click ESC to close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-slate-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <RxCross2 className="w-6 h-6 text-gray-500" />
        </button>

        {/* Modal Body */}
        <div aria-live="polite" className="w-full flex flex-col md:flex-row">
          {showSkeleton ? (
            <DetailsSkeleton />
          ) : isError ? (
            <DetailsError
              message={(error as Error | undefined)?.message ?? "Something went wrong."}
              onRetry={refetch}
            />
          ) : data === null ? (
            <DetailsEmpty close={onClose} />
          ) : data ? (
            <>
              {/* Image Section */}
              <div className="w-full md:w-2/5 bg-slate-100 flex items-center justify-center min-h-[200px]">
                <FaRegImage className="w-12 h-12 text-gray-400" />
              </div>

              {/* Details Section */}
              <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col">
                {/* Header */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    {data.category}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">{data.name}</h2>
                </div>

                {/* Price & Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-slate-900">
                    {formatCurrency(data.price)}
                  </span>
                  <Badge inStock={data.inStock} />
                </div>

                {/* Description */}
                <div className="prose prose-sm text-slate-600 flex-grow mb-8">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Description</h3>
                  <p>{data.description ?? "No description available."}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <button
                    disabled
                    title="Upcoming"
                    className="flex-1 bg-slate-900 text-white h-10 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Edit Product
                  </button>
                  <button
                    disabled
                    title="Upcoming"
                    className="flex-1 border border-slate-200 text-slate-700 h-10 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Analytics
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>

      </div>
    </div>
  );
};


function DetailsError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 w-full"
    >
      <p className="font-semibold text-red-900">We couldn&apos;t load this product.</p>
      <p className="mt-1">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
      >
        Try again
      </button>
    </div>
  )
}

type DetailsEmptyProp = {
  close: () => void
}



function DetailsEmpty({ close }: DetailsEmptyProp) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600 w-full">
      <p className="font-medium text-slate-900">We can&apos;t find that product.</p>
      <p className="mt-1">It may have been removed or never existed.</p>
      <button
        type="button"
        onClick={close}
        className="mt-4 inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Browse catalog
      </button>
    </div>
  )
}

function DetailsSkeleton() {
  return (
     <>
      {/* Image Section */}
      <div className="w-full md:w-2/5 bg-slate-100 min-h-[200px] animate-pulse flex items-center justify-center">
        <div className="w-16 h-16 bg-slate-200 rounded-lg" />
      </div>

      {/* Details Section */}
      <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col animate-pulse">
        {/* Category */}
        <div className="h-3 w-24 bg-slate-200 rounded mb-2"></div>

        {/* Product Name */}
        <div className="h-7 w-2/3 bg-slate-200 rounded mb-4"></div>

        {/* Price + Badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-32 bg-slate-200 rounded"></div>
          <div className="h-5 w-16 bg-slate-200 rounded"></div>
        </div>

        {/* Description Heading */}
        <div className="h-4 w-28 bg-slate-200 rounded mb-2"></div>

        {/* Description text */}
        <div className="space-y-2 mb-8 flex-grow">
          <div className="h-3 w-full bg-slate-200 rounded"></div>
          <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
          <div className="h-3 w-2/3 bg-slate-200 rounded"></div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          <div className="h-10 flex-1 bg-slate-200 rounded-lg"></div>
          <div className="h-10 flex-1 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    </>
  )
}



