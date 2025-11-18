// ---------------------------------------------------------------------
// <copyright file="useProducts.ts" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { ListResponse, Product } from '../../types'

type ProductsQueryParams = {
  query?: string
  category?: string
  page: number
  limit: number
}

async function fetchProducts(params: ProductsQueryParams) {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit)
  })

  if (params.query) {
    searchParams.set('query', params.query)
  }

  if (params.category) {
    searchParams.set('category', params.category)
  }

  const response = await fetch(`/products?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error('Unable to load products right now.')
  }

  return response.json() as Promise<ListResponse<Product>>
}

async function fetchProductDetails(id?: string) {
  if (!id) {
    throw new Error('Missing product id.')
  }

  const response = await fetch(`/products/${id}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Unable to load product details.')
  }

  return response.json() as Promise<Product>
}

export function useProducts(params: ProductsQueryParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    throwOnError: false,
    placeholderData: keepPreviousData,
    retry: 1
  })
}

export function useProductDetails(id?: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetails(id),
    enabled: Boolean(id),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1
  })
}

