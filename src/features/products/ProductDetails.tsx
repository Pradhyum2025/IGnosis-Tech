// ---------------------------------------------------------------------
// <copyright file="ProductDetails.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProductDetails } from './useProducts'
import { formatCurrency } from './formatCurrency'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

export function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const { data, isPending, isError, error, refetch } = useProductDetails(id)

  if (isPending) {
    return (
      <section className="px-4 py-8 sm:px-6 lg:px-8" aria-live="polite">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 rounded bg-slate-200" />
            <div className="h-64 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="h-6 w-32 rounded bg-slate-200" />
                <div className="h-8 w-3/4 rounded bg-slate-200" />
                <div className="h-6 w-24 rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="px-4 py-8 sm:px-6 lg:px-8" aria-live="polite">
        <div className="mx-auto max-w-4xl">
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700"
          >
            <p className="font-semibold text-red-900">We couldn&apos;t load this product.</p>
            <p className="mt-1">{(error as Error | undefined)?.message ?? 'Something went wrong.'}</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => refetch()}
              className="mt-4"
            >
              Try again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (data === null) {
    return (
      <section className="px-4 py-8 sm:px-6 lg:px-8" aria-live="polite">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600">
            <p className="font-medium text-slate-900">We can&apos;t find that product.</p>
            <p className="mt-1">It may have been removed or never existed.</p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/">Browse catalog</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="product-heading">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/">← Back to products</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                  {data.category}
                </p>
                <CardTitle id="product-heading" className="mt-2 text-3xl">
                  {data.name}
                </CardTitle>
              </div>
              <Badge variant={data.inStock ? 'default' : 'secondary'}>
                {data.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium text-slate-500">Price</p>
              <p className="text-4xl font-bold text-slate-900">{formatCurrency(data.price)}</p>
            </div>

            {data.description && (
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Description</h3>
                <p className="text-slate-600">{data.description}</p>
              </div>
            )}

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-slate-500">Category</dt>
                <dd className="mt-1 text-sm text-slate-900">{data.category}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Stock Status</dt>
                <dd className="mt-1 text-sm text-slate-900">
                  {data.inStock ? 'In Stock' : 'Out of Stock'}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}





