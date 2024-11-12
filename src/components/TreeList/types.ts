export interface TreeListProps {
  rootValues: string[]
  getChildren: (value: string) => string[] | undefined
  initiallyExpandedValues?: string[]
}

export interface TreeListUtils extends Pick<TreeListProps, 'getChildren'> {
  checkExpanded: (value: string) => boolean
}
