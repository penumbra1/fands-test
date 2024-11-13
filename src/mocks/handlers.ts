import { http, HttpResponse } from 'msw'
import { mockPages } from './mockPages'

export const handlers = [
  http.get(import.meta.env.VITE_APP_PAGES_URL, () => {
    return HttpResponse.json(mockPages)
  }),
]
