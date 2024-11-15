import type { Pages } from './types'

export function traversePageAncestors(
  pages: Pages,
  pageKey: string,
  visitor?: (pageKey: string) => void,
) {
  const ancestors = []
  let currentPageKey: string | undefined = pageKey

  while (currentPageKey && (currentPageKey = pages[currentPageKey]?.parentKey)) {
    ancestors.push(currentPageKey)
    visitor?.(currentPageKey)
  }

  return ancestors
}
