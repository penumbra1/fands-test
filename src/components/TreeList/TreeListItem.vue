<script setup lang="ts">
import type { TreeListInjection, TreeListItemProps, TreeListItemSlotProps } from './types'
import TreeListItemSubtree from './TreeListItemSubtree.vue'
import { inject } from 'vue'
import { TREELIST_INJECTION_KEY } from './constants'

const { value } = defineProps<TreeListItemProps>()

const { getItemLabel, getItemChildren } = inject<TreeListInjection>(TREELIST_INJECTION_KEY) ?? {}

const children = getItemChildren?.(value)
const label = getItemLabel?.(value)
</script>

<template>
  <li role="none">
    <slot name="item" v-if="!children?.length" v-bind="{ value, role: 'treeitem' }">
      <div role="treeitem">{{ label }}</div>
    </slot>
    <TreeListItemSubtree v-else :value>
      <template #item="item">
        <slot name="item" v-bind="item" />
      </template>
    </TreeListItemSubtree>
  </li>
</template>
