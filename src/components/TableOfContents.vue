<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TreeList from './TreeList/TreeList.vue'
</script>

<template>
  <nav>
    <TreeList
      :root-values="['one', 'two', 'three']"
      :initially-expanded-values="['three']"
      :get-children="
        (v) =>
          ({
            one: ['one-child'],
            three: ['three-child-1', 'three-child-2'],
            'three-child-2': ['three-grandchild'],
          })[v]
      "
      :get-parent="() => undefined"
    >
      <template v-slot="{ value }">
        <!-- TODO: should parents be clickable as links? -->
        <RouterLink :to="{ name: 'page', params: { path: value } }">{{ value }}</RouterLink>
      </template>
    </TreeList>
  </nav>
</template>
