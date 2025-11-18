// ---------------------------------------------------------------------
// <copyright file="ProductList.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React, { useMemo, useState } from 'react'
import { useProducts } from './useProducts'

import PaginationControls from '../../component/PaginationControls'
import RenderListContent from '@/component/RenderListContent'
import ProductToolbar from '../../component/ProductToolbar'
import { ResponsiveFilters } from '@/component/ResponsiveFilters'

const PAGE_LIMIT = 10
const CATEGORY_OPTIONS = ['all', 'Electronics', 'Home', 'Clothing', 'Books'] as const
const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'name-desc', label: 'Name (Z–A)' },
  { value: 'price-asc', label: 'Price (Low → High)' },
  { value: 'price-desc', label: 'Price (High → Low)' }
] as const

export function ProductList() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>('all')
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]['value']>('name-asc')
  const [page, setPage] = useState(1)

  const { data, isPending, isError, error, isFetching, refetch } = useProducts({
    query: query.trim() || undefined,
    category: category === 'all' ? undefined : category,
    page,
    limit: PAGE_LIMIT
  })

  const sortedProducts = useMemo(() => {
    if (!data?.items) return []
    return [...data.items].sort((a, b) => {
      if (sort === 'name-asc') {
        return a.name.localeCompare(b.name)
      }
      if (sort === 'name-desc') {
        return b.name.localeCompare(a.name)
      }
      if (sort === 'price-asc') {
        return a.price - b.price
      }
      if (sort === 'price-desc') {
        return b.price - a.price
      }
      return 0
    })
  }, [data?.items, sort])

  const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE_LIMIT)) : 1

  const handleQueryChange = (nextValue: string) => {
    setQuery(nextValue)
    setPage(1)
  }

  const handleCategoryChange = (nextValue: (typeof CATEGORY_OPTIONS)[number]) => {
    setCategory(nextValue)
    setPage(1)
  }

  const handleSortChange = (nextValue: (typeof SORT_OPTIONS)[number]['value']) => {
    setSort(nextValue)
  }


  const handleReset = () => {
    setQuery('')
    setCategory('all')
    setSort('name-asc')
    setPage(1)
  }

  const isResetDisabled = query === '' && category === 'all' && sort === 'name-asc'

  return (
    <section
      aria-labelledby="products-heading "
      className="py-3 px-1 bg-white border-5  min-h-[calc(100vh-200px)]"
    >
      <div className="mx-auto space-y-6 pb-20">
        {/* Products toolbar like category filter , Search , Sorting */}
        <ResponsiveFilters >
        <ProductToolbar
          query={query}
          category={category}
          sort={sort}
          onQueryChange={handleQueryChange}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          onReset={handleReset}
          resetDisabled={isResetDisabled}
        />

        </ResponsiveFilters>

          
        {/* Render Products Listings */}
        <div aria-live="polite" className="space-y-4">
          {isFetching && !isPending ? (
            <p className="text-sm text-brand-600" role="status">
              Updating results…
            </p>
          ) : null}
          {RenderListContent({
            isPending,
            isError,
            errorMessage: (error as Error | undefined)?.message ?? 'Something went wrong.',
            products: sortedProducts,
            onRetry: refetch
          })}
        </div>
      </div>
      
      {/* Pagination - Sticky at bottom of content area */}
      <div className="fixed bottom-0 left-0 right-0">
        <PaginationControls
          page={page}
          totalPages={totalPages}
          isDisabled={isPending || isFetching}
          onPageChange={setPage}
        />
      </div>
    </section>
  )
}









