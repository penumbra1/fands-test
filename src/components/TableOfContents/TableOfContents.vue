<script setup lang="ts">
import TreeList from '@/components/TreeList/TreeList.vue'
import type { GetPagesResponse } from '@/api/types'
import TableOfContentsLink from './TableOfContentsLink.vue'
import { useCurrentPage } from './useCurrentPage'
import { useScrollToCurrentPageLink } from './useScrollToCurrentPageLink'
import TableOfContentsError from './TableOfContentsError.vue'
import { useTemplateRef } from 'vue'
import { useFetch } from '@/api/useFetch'

const { error, data } = useFetch<GetPagesResponse>(import.meta.env.VITE_APP_PAGES_URL)

const currentPage = useCurrentPage(data)

const list = useTemplateRef('list')
useScrollToCurrentPageLink(list)

function getItemChildren(value: string) {
  return data?.value?.pages[value].childPageKeys
}

function getItemLabel(value: string) {
  return data?.value?.pages[value].name ?? value
}
</script>

<template>
  <TreeList
    v-if="data"
    :root-values="data?.rootLevelKeys"
    :initially-expanded-values="currentPage?.breadcrumbs"
    :get-item-children
    :get-item-label
    aria-label="Page Navigation"
    :class="$style.root"
    ref="list"
  >
    <template #item="{ value, ...slotProps }">
      <TableOfContentsLink
        :page="data?.pages[value].link"
        :text="getItemLabel(value)"
        v-bind="slotProps"
      />
    </template>
  </TreeList>
  <TableOfContentsError v-else-if="error" />
</template>

<style module>
ul[role='group'] {
  padding-inline-start: 10px;
  margin-inline-start: 12px;
  position: relative;
}

ul[role='group']::after {
  content: '';
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: 1px;
  background-color: var(--border-color);
}
</style>
