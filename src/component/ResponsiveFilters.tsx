// ---------------------------------------------------------------------
// <copyright file="ResponsiveFilters.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ResponsiveFilters({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Mobile Header */}
      <div
        className="lg:hidden flex justify-between items-center px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="font-medium text-slate-700">Filters</p>
        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-600" />
        )}
      </div>

      {/* Dropdown Panel on Mobile */}
      <div
        className={`lg:block overflow-hidden transition-all duration-300 ${
          open ? "max-h-[800px] mt-3" : "max-h-0 lg:max-h-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
