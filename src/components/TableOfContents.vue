<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TreeList from './TreeList/TreeList.vue'

import { useFetch } from '@vueuse/core'
import type { GetPagesResponse } from '@/api/types'

const { isFetching, error, data } = useFetch(import.meta.env.VITE_APP_PAGES_URL)
  .get()
  .json<GetPagesResponse>()
</script>

<template>
  <nav>
    <TreeList
      v-if="data"
      :root-values="data?.rootLevelKeys"
      :initially-expanded-values="['three']"
      :get-children="(v) => data?.pages[v].childPageKeys"
    >
      <template v-slot="{ value }">
        <RouterLink :to="{ name: 'page', params: { page: data?.pages[value].link } }">{{
          data?.pages[value].name
        }}</RouterLink>
      </template>
    </TreeList>
  </nav>
</template>
