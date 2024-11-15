import { shallowRef } from 'vue'
import type { FetchStatus } from './types'

export function useFetch<T>(url: string) {
  const data = shallowRef<T | undefined>()
  const error = shallowRef<Error | undefined>()
  const status = shallowRef<FetchStatus>('loading')

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      } else {
        return response.json()
      }
    })
    .then((response) => {
      data.value = response
      status.value = 'ready'
    })
    .catch((e) => {
      status.value = 'error'
      error.value = e
    })

  return { data, error, status }
}
