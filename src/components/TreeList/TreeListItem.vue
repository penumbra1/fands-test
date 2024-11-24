<script setup lang="ts">
import type { TreeListInjection, TreeListItemProps } from './types'
import TreeListItemSubtree from './TreeListItemSubtree.vue'
import { inject } from 'vue'
import { TREELIST_INJECTION_KEY } from './constants'

const { value } = defineProps<TreeListItemProps>()

const { getItemLabel, getItemChildren } = inject<TreeListInjection>(TREELIST_INJECTION_KEY) ?? {}
</script>

<template>
  <li role="none">
    <slot name="item" v-if="!getItemChildren?.(value)?.length" v-bind="{ value, role: 'treeitem' }">
      <div role="treeitem">{{ getItemLabel?.(value) }}</div>
    </slot>
    <TreeListItemSubtree v-else :value>
      <template #item="item">
        <slot name="item" v-bind="item" />
      </template>
    </TreeListItemSubtree>
  </li>
</template>
