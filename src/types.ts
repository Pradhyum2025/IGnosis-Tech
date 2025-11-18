// ---------------------------------------------------------------------
// <copyright file="types.ts" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

export type Product = {
  id: string
  name: string
  price: number
  category: string
  inStock: boolean
  description?: string
}
export type ListResponse<T> = {
  items: T[]
  page: number
  limit: number
  total: number
}

