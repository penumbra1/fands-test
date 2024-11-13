export interface Page {
  key: string
  name: string
  level: number
  link: string
  parentKey?: string
  childPageKeys?: string[]
}

export interface GetPagesResponse {
  pages: Record<string, Page>
  rootLevelKeys: string[]
}
