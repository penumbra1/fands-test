<script setup lang="ts">
import TreeList from '@/components/TreeList/TreeList.vue'
import { useFetch, watchOnce } from '@vueuse/core'
import type { GetPagesResponse } from '@/api/types'
import TableOfContentsLink from './TableOfContentsLink.vue'
import { useCurrentPageBreadcrumbs } from './useCurrentPageBreadcrumbs'
import { useTemplateRef } from 'vue'

const { isFetching, error, data } = useFetch(import.meta.env.VITE_APP_PAGES_URL)
  .get()
  .json<GetPagesResponse>()

const currentPageBreadcrumbs = useCurrentPageBreadcrumbs(data)

function getItemChildren(value: string) {
  return data?.value?.pages[value].childPageKeys
}

function getItemLabel(value: string) {
  return data?.value?.pages[value].name ?? value
}

const list = useTemplateRef('treelist')

watchOnce(list, () => {
  if (list.value) {
    const currentLink = list.value.$el.querySelector("[aria-current='page']")
    currentLink.scrollIntoView({ behavior: 'smooth' })
  }
})
</script>

<template>
  <TreeList
    v-if="data"
    :root-values="data?.rootLevelKeys"
    :initially-expanded-values="currentPageBreadcrumbs"
    :get-item-children
    :get-item-label
    aria-label="Page Navigation"
    :class="$style.root"
    ref="treelist"
  >
    <template #item="{ value, onClick, ...slotProps }">
      <TableOfContentsLink
        :page="data?.pages[value].link"
        :text="getItemLabel(value)"
        @click.capture="onClick"
        v-bind="slotProps"
        :expands="Object.hasOwn(slotProps, 'aria-expanded')"
        class="link"
      />
    </template>
  </TreeList>
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
