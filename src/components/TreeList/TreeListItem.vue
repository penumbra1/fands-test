<script setup lang="ts">
import type { TreeListItemProps } from './types'
import TreeListItemParent from './TreeListItemParent.vue'

defineProps<TreeListItemProps>()
</script>

<template>
  <li>
    <TreeListItemParent v-if="children" :value :children>
      <template #item="item: { value: string }">
        <slot name="item" v-bind="item" />
      </template>
    </TreeListItemParent>
    <div role="treeitem" v-else>
      <slot name="item" :value>
        {{ value }}
      </slot>
    </div>
  </li>
</template>
