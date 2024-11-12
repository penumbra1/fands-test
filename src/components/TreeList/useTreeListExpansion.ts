import { ref } from 'vue'
import { TREE_LIST_EXPANSION_ATTRIBUTE } from './constants'

export function useTreeListExpansion(initiallyExpanded?: string[]) {
  const expanded = ref(new Set(initiallyExpanded))

  function handleExpansion(e: Event) {
    const value = (e.target as HTMLElement).dataset[TREE_LIST_EXPANSION_ATTRIBUTE]

    if (value === undefined) return

    if (expanded.value.has(value)) {
      expanded.value.delete(value)
    } else {
      expanded.value.add(value)
    }
  }

  function checkExpanded(value: string) {
    return expanded.value.has(value)
  }

  return { handleExpansion, checkExpanded }
}
