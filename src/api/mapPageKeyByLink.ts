import type { Pages } from './types'

export function mapPageKeyByLink(pages: Pages) {
  const pageKeyByLink: Record<string, string> = {}

  for (const { key, link } of Object.values(pages)) {
    pageKeyByLink[link] = key
  }

  return pageKeyByLink
}
