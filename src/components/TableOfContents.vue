<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TreeList from './TreeList/TreeList.vue'
</script>

<template>
  <nav>
    <TreeList
      :items="[
        { key: 'one' },
        { key: 'two' },
        {
          key: 'three',
          children: [
            { key: 'three-child-1' },
            {
              key: 'three-child-2',
              children: [{ key: 'three-grandchild-1' }, { key: 'three-grandchild-2' }],
            },
          ],
        },
      ]"
    >
      <template #item="{ key }">
        <RouterLink :to="{ name: 'page', params: { path: key } }">{{ key }}</RouterLink>
      </template>
    </TreeList>
  </nav>
</template>
