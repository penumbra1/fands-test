<script setup lang="ts">
import { provide } from 'vue'
import type { TreeListInjection, TreeListItemSlotProps, TreeListProps } from './types'
import TreeListItem from './TreeListItem.vue'
import { TREELIST_INJECTION_KEY } from './constants'

const { initiallyExpandedValues, getItemChildren, getItemLabel } = defineProps<TreeListProps>()

const initiallyExpandedSet = new Set(initiallyExpandedValues)

provide<TreeListInjection>(TREELIST_INJECTION_KEY, {
  initiallyExpandedValues: initiallyExpandedSet,
  getItemChildren,
  getItemLabel,
})
</script>

<template>
  <ul v-if="rootValues.length" :class="$style.container" role="tree">
    <TreeListItem v-for="value in rootValues" :key="value" :value>
      <template #item="item: TreeListItemSlotProps">
        <slot name="item" v-bind="item" />
      </template>
    </TreeListItem>
  </ul>
</template>

<style module>
.container,
.container ul {
  list-style: none;
  margin: 0;
  padding: 0;
  user-select: none;
}
</style>
