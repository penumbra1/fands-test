import type { HTMLAttributes } from 'vue'

export interface TreeListProps {
  rootValues: string[]
  getItemLabel: (value: string) => string
  getItemChildren: (value: string) => string[] | undefined
  initiallyExpandedValues?: Set<string>
}

export interface TreeListItemProps {
  value: string
}

export interface TreeListItemSlotProps
  extends Pick<HTMLAttributes, 'aria-label' | 'aria-owns' | 'aria-expanded' | 'role'> {
  value: string
  onClick?: () => void
}

export type TreeListInjection = Pick<
  TreeListProps,
  'getItemChildren' | 'getItemLabel' | 'initiallyExpandedValues'
>
