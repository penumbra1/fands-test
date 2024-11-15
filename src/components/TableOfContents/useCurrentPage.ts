import { traversePageAncestors } from '@/api/traversePageAncestors'
import { mapPageKeyByLink } from '@/api/mapPageKeyByLink'
import type { GetPagesResponse } from '@/api/types'
import { useRouteParams } from '@vueuse/router'
import { computed, type Ref } from 'vue'

export function useCurrentPage(data: Ref<GetPagesResponse | null>) {
  const currentPage = useRouteParams<string | undefined>('page')

  // There is no reliable way to derive a page key from its link, so we have to maintain this mapping.
  const pageKeyByLink = computed(() => data.value && mapPageKeyByLink(data.value.pages))

  return computed(() => {
    if (!data.value?.pages || !pageKeyByLink.value || !currentPage.value) return

    const currentPageKey = pageKeyByLink.value[currentPage.value]
    const breadcrumbs = new Set([currentPageKey])

    traversePageAncestors(data.value.pages, currentPageKey, (ancestorKey) =>
      breadcrumbs.add(ancestorKey),
    )

    return { key: currentPageKey, breadcrumbs }
  })
}
