// ---------------------------------------------------------------------
// <copyright file="badge.tsx" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import * as React from 'react'
import { cn } from '../../lib/utils'

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        variant === 'default'
          ? 'border-brand-200 bg-brand-50 text-brand-600'
          : 'border-slate-200 bg-slate-50 text-slate-600',
        className
      )}
      {...props}
    />
  )
}









