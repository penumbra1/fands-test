<script setup lang="ts">
import { provide, ref } from 'vue'
import type { TreeListProps, TreeListUtils } from './types'
import TreeListItem from './TreeListItem.vue'
import { useTreeListExpansion } from './useTreeListExpansion'
import { TREE_LIST_UTILS_INJECTION_KEY } from './constants'

const { initiallyExpandedValues, getChildren } = defineProps<TreeListProps>()

const { handleExpansion, checkExpanded } = useTreeListExpansion(initiallyExpandedValues)

provide<TreeListUtils>(TREE_LIST_UTILS_INJECTION_KEY, { getChildren, checkExpanded })
</script>

<template>
  <ul @click="handleExpansion">
    <TreeListItem v-for="value in rootValues" :key="value" :value>
      <template #item="item">
        <slot v-bind="item" />
      </template>
    </TreeListItem>
  </ul>
</template>
