<script setup lang="ts">
import type { TreeListNode } from './types';

defineProps<{
  nodes: TreeListNode[],
  expandedKeys?: Set<string>
}>()
</script>

<template>
  <ul>
    <template v-for="node in nodes" :key="node.key">
      <li>
      {{ node.label }}
      </li>
    </template>
  </ul>
</template>
