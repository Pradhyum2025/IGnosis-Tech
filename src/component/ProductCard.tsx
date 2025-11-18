// ---------------------------------------------------------------------
// <copyright file="ProductCard.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types";
import { Badge } from "./Badge";
import { FaRegImage } from "react-icons/fa6";
import { formatCurrency } from "../features/products/formatCurrency";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
  <div
    onClick={handleClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={`View details for ${product.name}`}
    className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer overflow-hidden flex flex-col h-full"
  >
    <div className="h-40 bg-slate-50 border-b border-slate-100 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
      <FaRegImage  className="w-6 h-6 text-gray-500"/>
    </div>

    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-xs text-slate-500 mb-1">{product.category}</p>
          <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
        </div>
      </div>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
        <span className="font-bold text-slate-900">{formatCurrency(product.price)}</span>
        <Badge inStock={product.inStock} />
      </div>
    </div>
  </div>
  );
};
