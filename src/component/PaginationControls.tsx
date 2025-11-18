// ---------------------------------------------------------------------
// <copyright file="PaginationControls.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import {
  Pagination,
  PaginationContent,
  PaginationInfo,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '../components/ui/pagination'

type PaginationControlsProps = {
  page: number
  totalPages: number
  isDisabled?: boolean
  onPageChange: (page: number) => void
}

export default function PaginationControls({
  page,
  totalPages,
  isDisabled = false,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null

  const isMobile = window.innerWidth < 768

  return (
    <nav aria-label="Pagination" className=" z-40 w-full rounded-tr-md rounded-tl-md border-t border-slate-200 bg-white p-3 shadow-lg flex flex-row items-center justify-between gap-4 mt-4">
      {/* Page Info */}
      <div className={`w-[60%] md:w-[65%] lg:w-[60%] ${isMobile?"justify-start":"justify-end"} flex items-center `}>
        <div className='border-[3px] border-gray-300 rounded-3xl px-3 py-2'>
      <PaginationInfo aria-live="polite" aria-atomic="true">
        Page <span className="font-semibold text-slate-900">{page}</span> of{' '}
        <span className="font-semibold text-slate-900">{totalPages}</span>
      </PaginationInfo>

        </div>

      </div>

      {/* Pagination Controls */}
      <div className='w-[25%] flex items-center justify-end'>
      <Pagination>
        <PaginationContent className="flex gap-2">
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1 || isDisabled}
              aria-label={`Go to page ${Math.max(1, page - 1)}`}
              className="hover:scale-105 transition-transform duration-150"
            />
          </PaginationItem>

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || isDisabled}
              aria-label={`Go to page ${Math.min(totalPages, page + 1)}`}
              className=" bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      </div>
    </nav>
  )
}

