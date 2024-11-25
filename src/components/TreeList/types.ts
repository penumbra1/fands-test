import type { HTMLAttributes, Ref } from 'vue'

export interface TreeListProps {
  rootValues: string[]
  getItemLabel: (value: string) => string
  getItemChildren: (value: string) => string[] | undefined
  initiallyExpandedValues?: Set<string>
  ariaLabel?: string
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
  toggleExpanded?: () => void
}

export type TreeListInjection = Pick<TreeListProps, 'getItemChildren' | 'getItemLabel'> & {
  expandedValues: Ref<Set<string> | undefined>
}
