// ---------------------------------------------------------------------
// <copyright file="pagination.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import * as React from 'react'
import { cn } from '../../lib/utils'

export function Pagination({ className, ...props }: React.HTMLAttributes<nav>) {
  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn('flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between', className)}
      {...props}
    />
  )
}

export function PaginationContent({ className, ...props }: React.HTMLAttributes<ul>) {
  return <ul className={cn('flex items-center gap-2', className)} {...props} />
}

export function PaginationItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn('list-none', className)} {...props} />
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const baseButton =
  'inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50'

export function PaginationPrevious(props: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(baseButton, 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50', props.className)}
    >
      Previous
    </button>
  )
}

export function PaginationNext(props: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(baseButton, 'border-brand-500 bg-brand-500 text-white hover:bg-brand-600', props.className)}
    >
      Next
    </button>
  )
}

export function PaginationInfo({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-600">{children}</p>
}









