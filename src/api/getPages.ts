import type { Page } from '@/api/types'

export default async function getPages(): Promise<{
  pages: Record<string, Page>
  rootLevelKeys: string[]
}> {
  return { pages: {}, rootLevelKeys: [] }
}
