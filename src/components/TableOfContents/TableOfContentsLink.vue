<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Chevron from '@/components/icons/chevron.svg?component'
import type { TreeListItemHTMLAttributes } from '../TreeList/types'

interface Props extends /* @vue-ignore */ TreeListItemHTMLAttributes {
  page: string
  text: string
  onClick?: () => void
}

defineProps<Props>()
</script>

<template>
  <RouterLink
    :to="{ name: 'page', params: { page } }"
    @click.capture="onClick"
    class="link"
    :title="text"
  >
    <span>{{ text }}</span>
    <Chevron v-if="$attrs['aria-expanded'] !== undefined" aria-hidden class="expand-indicator" />
  </RouterLink>
</template>

<style scoped>
.link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background-color: transparent;
  color: var(--text-color-muted);
  text-decoration: none;
  transition:
    background-color 100ms ease-in,
    color 75ms ease;
  scroll-margin-top: 64px;
  outline: none;
}

.link[aria-current='page'] {
  background-color: var(--background-color-primary);
  color: var(--text-color-primary);
  font-weight: 600;
}

.link:focus-visible {
  outline: 2px solid var(--outline-color);
  outline-offset: -2px;
}

.link:hover:not([aria-current='page']),
.link:active:not([aria-current='page']) {
  color: var(--text-color);
  background-color: var(--background-color-accent);
}

.link > span {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.expand-indicator {
  display: block;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  transition: transform 100ms ease-in-out;
}

[aria-expanded='true'] .expand-indicator {
  transform: rotate(90deg);
}
</style>
