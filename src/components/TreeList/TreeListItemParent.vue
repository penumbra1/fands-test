<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { TREELIST_EXPANDED_INJECTION_KEY } from './constants'
import { inject } from 'vue'
import TreeListItem from './TreeListItem.vue'

const { value } = defineProps<{
  value: string
  children: string[]
}>()

const initiallyExpandedValues = inject<Set<string>>(TREELIST_EXPANDED_INJECTION_KEY)

const [isExpanded, toggleIsExpanded] = useToggle(initiallyExpandedValues?.has(value))
</script>

<template>
  <div role="treeitem" @click="toggleIsExpanded()">
    <slot name="item" :value>
      {{ value }}
    </slot>
    EXP
  </div>
  <ul v-if="isExpanded">
    <TreeListItem v-for="child in children" :value="child" :key="child">
      <template #item="item: { value: string }">
        <slot name="item" v-bind="item" />
      </template>
    </TreeListItem>
  </ul>
</template>
