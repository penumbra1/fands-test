import type { Pages } from './types'

export function findPageAncestors(pages: Pages, pageKey: string) {
  const ancestors = []
  let currentPageKey: string | undefined = pageKey

  while (currentPageKey && (currentPageKey = pages[currentPageKey]?.parentKey)) {
    ancestors.push(currentPageKey)
  }

  return ancestors
}
