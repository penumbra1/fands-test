import { http, HttpResponse } from 'msw'
// import { mockPages } from './mockPages'
import mockFullPages from './mockFullPages.json'

export const handlers = [
  http.get(import.meta.env.VITE_APP_PAGES_URL, () => {
    // return HttpResponse.json(mockPages)
    return HttpResponse.json(mockFullPages)
  }),
]
