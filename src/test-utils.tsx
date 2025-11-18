// ---------------------------------------------------------------------
// <copyright file="test-utils.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'
import { render } from '@testing-library/react'

type RenderOptions = {
  router?: MemoryRouterProps
}

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    }
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter {...options?.router}>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

