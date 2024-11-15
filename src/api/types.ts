export interface Page {
  key: string
  name: string
  level: number
  link: string
  parentKey?: string
  childPageKeys?: string[]
}

export type Pages = Record<string, Page>

export interface GetPagesResponse {
  pages: Pages
  rootLevelKeys: string[]
}

export type FetchStatus = 'ready' | 'loading' | 'error'
