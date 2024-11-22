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

export type TreeListItemHTMLAttributes = Pick<
  HTMLAttributes,
  'aria-label' | 'aria-owns' | 'aria-expanded' | 'role'
>

export interface TreeListItemSlotProps extends TreeListItemHTMLAttributes {
  value: string
  onClick?: () => void
}

export type TreeListInjection = Pick<
  TreeListProps,
  'getItemChildren' | 'getItemLabel' | 'initiallyExpandedValues'
>
