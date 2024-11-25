<script setup lang="ts">
import Search from '@/components/icons/search.svg?component'

defineProps<{ onChange: (value: string) => void }>()
</script>

<template>
  <div class="container">
    <input
      type="text"
      @input="(e) => onChange((e.target as HTMLInputElement).value)"
      name="filter"
      placeholder="Search pages..."
      autocomplete="off"
    />
    <Search aria-hidden />
  </div>
</template>

<style scoped>
.container {
  --fade-height: 18px;

  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding-top: 16px;
  margin-bottom: var(--fade-height);
  background-color: var(--background-color);
  color: var(--text-color-muted);
}

.container::after {
  content: '';
  position: absolute;
  top: 100%;
  width: 100%;
  height: var(--fade-height);
  background: linear-gradient(var(--background-color), var(--background-color) 30%, transparent);
}

input {
  width: 100%;
  margin: 0px;
  padding: 8px 10px;
  padding-right: 32px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1em;
  color: currentColor;
}

input:focus-visible {
  outline: 2px solid var(--outline-color);
  outline-offset: -3px;
}

svg {
  position: absolute;
  right: 10px;
  pointer-events: none;
}
</style>
