// ---------------------------------------------------------------------
// <copyright file="api.ts" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

const inferredBase = import.meta.env.VITE_API_BASE ?? '';

export const API_BASE =
  inferredBase !== ''
    ? inferredBase
    : import.meta.env.PROD
      ? '/api'
      : '';
