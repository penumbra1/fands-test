<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { TREELIST_INJECTION_KEY } from './constants'
import { computed, inject, watchEffect } from 'vue'
import TreeListItem from './TreeListItem.vue'
import type { TreeListInjection, TreeListItemProps, TreeListItemSlotProps } from './types'

const { value } = defineProps<TreeListItemProps>()

const { expandedValues, getItemLabel, getItemChildren } =
  inject<TreeListInjection>(TREELIST_INJECTION_KEY) ?? {}

const subtreeId = `${value}-subtree`
const label = getItemLabel?.(value)

const [isExpanded, toggleIsExpanded] = useToggle(expandedValues?.value?.has(value))

watchEffect(() => {
  isExpanded.value = !!expandedValues?.value?.has(value)
})

const parentItemSlotProps = computed(() => ({
  value,
  toggleExpanded: () => toggleIsExpanded(),
  role: 'treeitem',
  'aria-owns': subtreeId,
  'aria-expanded': isExpanded.value,
}))
</script>

<template>
  <slot name="item" v-bind="parentItemSlotProps">
    <div v-bind="parentItemSlotProps">
      {{ label }}
    </div>
  </slot>
  <ul role="group" v-show="isExpanded" :id="subtreeId" :aria-label="label">
    <TreeListItem v-for="child in getItemChildren?.(value)" :value="child" :key="child">
      <template #item="item: TreeListItemSlotProps">
        <slot name="item" v-bind="item" />
      </template>
    </TreeListItem>
  </ul>
</template>
