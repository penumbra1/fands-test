<script setup lang="ts">
import { RouterView } from 'vue-router'
import TableOfContents from './components/TableOfContents/TableOfContents.vue'
</script>

<template>
  <div class="layout">
    <header />
    <div class="content">
      <nav>
        <TableOfContents />
      </nav>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  --header-height: 4rem;
  height: 100dvh;
}

.content {
  display: grid;
  grid-template-columns: 300px 1fr;
  max-width: 90rem;
  margin: auto;
}

header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100dvw;
  height: var(--header-height);
  z-index: 1;
  background-color: var(--background-color);
  border-bottom: 1px solid var(--border-color);
}

nav {
  position: sticky;
  top: 0;
  grid-column: 1;
  height: calc(100dvh - 4rem);
  overflow: auto;
  padding: 16px;
  scrollbar-width: thin;
  scrollbar-gutter: stable;
  border-right: 1px solid var(--border-color);
}

main {
  display: flex;
  justify-content: center;
  padding: 24px;
}
</style>
