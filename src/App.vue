<script setup lang="ts">
import { RouterView } from 'vue-router'
import TableOfContents from './components/TableOfContents.vue'
</script>

<template>
  <div>
    <TableOfContents />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
