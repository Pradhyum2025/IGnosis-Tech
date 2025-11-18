// ---------------------------------------------------------------------
// <copyright file="SkeletonCard.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from "react";


export function SkeletonCard() {
  return (
     <div className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image Placeholder */}
      <div className="h-40 bg-slate-200 flex items-center justify-center">
        <div className="w-8 h-8 bg-slate-300 rounded" />
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category */}
        <div className="h-3 w-20 rounded bg-slate-200 mb-3" />

        {/* Product Name */}
        <div className="h-4 w-32 rounded bg-slate-200 mb-6" />

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
          {/* Price */}
          <div className="h-4 w-16 rounded bg-slate-200" />

          {/* Badge */}
          <div className="h-5 w-14 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  )
}