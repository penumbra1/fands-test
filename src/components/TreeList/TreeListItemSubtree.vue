<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { TREELIST_INJECTION_KEY } from './constants'
import { computed, inject } from 'vue'
import TreeListItem from './TreeListItem.vue'
import type { TreeListInjection, TreeListItemProps, TreeListItemSlotProps } from './types'

const { value } = defineProps<TreeListItemProps>()

const { initiallyExpandedValues, getItemLabel, getItemChildren } =
  inject<TreeListInjection>(TREELIST_INJECTION_KEY) ?? {}

const subtreeId = `${value}-subtree`
const children = getItemChildren?.(value)
const label = getItemLabel?.(value)

const [isExpanded, toggleIsExpanded] = useToggle(initiallyExpandedValues?.has(value))

function onClick() {
  toggleIsExpanded()
}

const itemSlotProps = computed(() => ({
  value,
  onClick,
  role: 'treeitem',
  'aria-owns': subtreeId,
  'aria-expanded': isExpanded.value,
}))
</script>

<template>
  <slot name="subtree" v-bind="itemSlotProps">
    <div v-bind="itemSlotProps">
      {{ label }}
    </div>
  </slot>
  <ul role="group" v-show="isExpanded" :id="subtreeId" :aria-label="label">
    <TreeListItem v-for="child in children" :value="child" :key="child">
      <template #item="item: TreeListItemSlotProps">
        <slot name="subtree" v-bind="item" />
      </template>
    </TreeListItem>
  </ul>
</template>
