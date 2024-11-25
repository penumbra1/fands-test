<script setup lang="ts">
import { computed, provide } from 'vue'
import type { TreeListInjection, TreeListItemSlotProps, TreeListProps } from './types'
import TreeListItem from './TreeListItem.vue'
import { TREELIST_INJECTION_KEY } from './constants'
import { useFilter } from './useFilter'

const { initiallyExpandedValues, getItemChildren, getItemLabel, rootValues } =
  defineProps<TreeListProps>()

const { filteredValues, updateFilter, matchesFilter } = useFilter(rootValues, getItemChildren)

const expandedValues = computed(() => filteredValues.value || initiallyExpandedValues)

provide<TreeListInjection>(TREELIST_INJECTION_KEY, {
  expandedValues,
  getItemChildren: (value) => getItemChildren(value)?.filter(matchesFilter),
  getItemLabel,
})
</script>

<template v-if="rootValues.length">
  <div>
    <slot name="filter" v-bind="{ updateFilter }">
      <input @input="(e) => updateFilter((e.target as HTMLInputElement).value)" />
    </slot>
    <ul role="tree" :aria-label>
      <template v-for="value in rootValues.filter(matchesFilter)" :key="value">
        <TreeListItem :value>
          <template #item="item: TreeListItemSlotProps">
            <slot name="item" v-bind="item" />
          </template>
        </TreeListItem>
      </template>
    </ul>
  </div>
</template>
