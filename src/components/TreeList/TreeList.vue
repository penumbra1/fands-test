<script setup lang="ts">
import type { TreeListItem } from './types'

defineProps<{
  items: TreeListItem[]
}>()
</script>

<template>
  <ul>
    <template v-for="item in items" :key="item.key">
      <li>
        <slot name="item" v-bind="item">
          {{ item.key }}
        </slot>
        <TreeList v-if="item.children?.length" :items="item.children">
          <template #item="child: TreeListItem">
            <slot name="item" v-bind="child" />
          </template>
        </TreeList>
      </li>
    </template>
  </ul>
</template>
