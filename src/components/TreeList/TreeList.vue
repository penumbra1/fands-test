<script setup lang="ts">
import { provide } from 'vue'
import type { TreeListProps } from './types'
import TreeListItem from './TreeListItem.vue'
import { TREELIST_EXPANDED_INJECTION_KEY } from './constants'

const { initiallyExpandedValues, getChildren } = defineProps<TreeListProps>()

const initiallyExpandedSet = new Set(initiallyExpandedValues)

provide(TREELIST_EXPANDED_INJECTION_KEY, initiallyExpandedSet)
</script>

<template>
  <ul v-if="rootValues.length">
    <TreeListItem v-for="value in rootValues" :key="value" :value :children="getChildren(value)">
      <template #item="item">
        <slot name="item" v-bind="item" />
      </template>
    </TreeListItem>
  </ul>
</template>
