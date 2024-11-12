<script setup lang="ts">
import type { TreeListUtils } from './types'
import TreeListExpandButton from './TreeListExpandButton.vue'
import { inject } from 'vue'
import { TREE_LIST_UTILS_INJECTION_KEY, TREE_LIST_EXPANSION_ATTRIBUTE } from './constants'

const { value } = defineProps<{ value: string }>()

const { getChildren, checkExpanded } = inject<TreeListUtils>(TREE_LIST_UTILS_INJECTION_KEY) ?? {}
const children = getChildren?.(value)
</script>

<template>
  <li>
    <div>
      <slot name="item" v-bind="{ value }">
        {{ value }}
      </slot>
      <TreeListExpandButton
        v-if="children?.length"
        :[`data-${String(TREE_LIST_EXPANSION_ATTRIBUTE)}`]="value"
      />
    </div>
    <ul v-if="children?.length && checkExpanded?.(value)">
      <TreeListItem v-for="child in children" :value="child" :key="child">
        <template #item="item: { value: string }">
          <slot name="item" v-bind="item" />
        </template>
      </TreeListItem>
    </ul>
  </li>
</template>
