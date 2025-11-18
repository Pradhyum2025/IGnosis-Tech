// ---------------------------------------------------------------------
// <copyright file="badge.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from "react";

interface BadgeProps {
  inStock: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ inStock }) => {
  const styles = inStock
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-rose-50 text-rose-700 border-rose-200";

  return (
    <span
      className={`px-2 py-1 text-xs font-medium border rounded-full ${styles}`}
    >
      {inStock ? "In Stock" : "Out of Stock"}
    </span>
  );
};
