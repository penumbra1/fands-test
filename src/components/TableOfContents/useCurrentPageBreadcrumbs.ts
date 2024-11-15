import { findPageAncestors } from "@/api/findPageAncestors";
import { mapPageKeyByLink } from "@/api/mapPageKeyByLink";
import type { GetPagesResponse } from "@/api/types";
import { useRouteParams } from "@vueuse/router";
import { computed, type Ref } from "vue";

export function useCurrentPageBreadcrumbs(data: Ref<GetPagesResponse | null>) {
  const page = useRouteParams<string | undefined>('page')

  const pageKeyByLink = computed(() => data.value?.pages && mapPageKeyByLink(data.value.pages))
  const currentPageKey = computed(() => page.value && pageKeyByLink.value?.[page.value])

  return computed(() => {
    if (!currentPageKey.value || !data.value?.pages) return

    const currentPageAncestors = findPageAncestors(data.value.pages, currentPageKey.value) ?? []

    return [currentPageKey.value].concat(currentPageAncestors)
  })
}