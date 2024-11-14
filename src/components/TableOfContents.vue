<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TreeList from './TreeList/TreeList.vue'

import { useFetch } from '@vueuse/core'
import type { GetPagesResponse } from '@/api/types'
import { computed } from 'vue'
import { mapPageKeyByLink } from '../api/mapPageKeyByLink'
import { findPageAncestors } from '@/api/findPageAncestors'
import { useRouteParams } from '@vueuse/router'

const { isFetching, error, data } = useFetch(import.meta.env.VITE_APP_PAGES_URL)
  .get()
  .json<GetPagesResponse>()

const page = useRouteParams<string | undefined>('page')
const pageKeyByLink = computed(() => data.value && mapPageKeyByLink(data.value.pages))
const currentPageKey = computed(() => page.value && pageKeyByLink.value?.[page.value])

const initiallyExpandedValues = computed(() => {
  if (!data.value || !currentPageKey.value) return

  const currentPageAncestors = findPageAncestors(data.value?.pages, currentPageKey.value) ?? []

  return [currentPageKey.value].concat(currentPageAncestors)
})

function getChildren(value: string) {
  return data?.value?.pages[value].childPageKeys
}
</script>

<template>
  <nav>
    <TreeList
      v-if="data"
      :root-values="data?.rootLevelKeys"
      :initially-expanded-values="initiallyExpandedValues"
      :get-children="getChildren"
    >
      <template #item="{ value }">
        <RouterLink :to="{ name: 'page', params: { page: data?.pages[value].link } }">{{
          data?.pages[value].name
        }}</RouterLink>
      </template>
    </TreeList>
  </nav>
</template>
