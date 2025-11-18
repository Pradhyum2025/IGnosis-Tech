// ---------------------------------------------------------------------
// <copyright file="ProductDetails.test.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { renderWithProviders } from '../../test-utils'
import { ProductDetails } from './ProductDetails'

function renderDetailsRoute(productId: string) {
  return renderWithProviders(
    <Routes>
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>,
    {
      router: { initialEntries: [`/products/${productId}`] }
    }
  )
}

describe('ProductDetails', () => {
  it('shows data for a product', async () => {
    renderDetailsRoute('p-1')

    await screen.findByRole('heading', { name: /noise-canceling headphones/i })
    expect(screen.getByText(/₹89\.99|89\.99/)).toBeInTheDocument()
    expect(screen.getAllByText(/in stock/i).length).toBeGreaterThan(0)
  })

  it('renders empty state when product is missing', async () => {
    renderDetailsRoute('missing-product')

    await screen.findByText(/we can't find that product/i)
    expect(screen.getByRole('link', { name: /browse catalog/i })).toBeInTheDocument()
  })
})

