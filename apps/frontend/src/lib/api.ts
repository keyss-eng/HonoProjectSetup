// apps/frontend/src/lib/api.ts
import { hc } from 'hono/client'
import type { AppType } from '../../../backend/src/index' // Backend se types import

// 'api' object automatically aapke backend ke saare routes janta hai
export const api = hc<AppType>('https://backend.vishalkumar-9ca.workers.dev/')