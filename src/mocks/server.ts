// ---------------------------------------------------------------------
// <copyright file="server.ts" company="iGnosis Tech">
// Copyright (c) iGnosis Tech. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import { setupServer } from 'msw/node'
import { handlers } from './handlers'
export const server = setupServer(...handlers)

