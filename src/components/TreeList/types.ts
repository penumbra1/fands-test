export interface TreeListProps {
  rootValues: string[]
  getChildren: (value: string) => string[] | undefined
  initiallyExpandedValues?: string[]
}

export type TreeListItemProps = {
  value: string
  children?: string[]
  initiallyExpanded?: boolean
}
