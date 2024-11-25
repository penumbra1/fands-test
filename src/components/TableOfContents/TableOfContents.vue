<script setup lang="ts">
import TreeList from '@/components/TreeList/TreeList.vue'
import type { GetPagesResponse } from '@/api/types'
import TableOfContentsLink from './TableOfContentsLink.vue'
import { useCurrentPage } from './useCurrentPage'
import { useScrollToCurrentPageLink } from './useScrollToCurrentPageLink'
import TableOfContentsError from './TableOfContentsError.vue'
import { useTemplateRef } from 'vue'
import { useFetch } from '@/api/useFetch'
import TableOfContentsFilter from './TableOfContentsFilter.vue'

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
    aria-label="Page navigation"
    ref="list"
    :class="$style['table-of-contents']"
  >
    <template #item="{ value, ...slotProps }">
      <TableOfContentsLink
        :page="data?.pages[value].link"
        :text="getItemLabel(value)"
        v-bind="slotProps"
      />
    </template>
    <template #filter="{ updateFilter }">
      <TableOfContentsFilter :onChange="updateFilter" />
    </template>
  </TreeList>
  <TableOfContentsError v-else-if="error" />
</template>

<style lang="scss" module>
.table-of-contents {
  --gap: 2px;

  padding-inline: 16px;
  padding-bottom: 16px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    user-select: none;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }

  ul[role='group'] {
    position: relative;
    padding-left: 10px;
    margin-left: 12px;
    margin-top: var(--gap);

    &::before {
      content: '';
      position: absolute;
      top: 4px;
      bottom: 4px;
      left: 4px;
      width: 1px;
      background-color: var(--border-color);
    }
  }
}
</style>
