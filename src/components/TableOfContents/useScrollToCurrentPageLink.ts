import { watchEffect, type ComponentPublicInstance, type ShallowRef } from 'vue'

export function useScrollToCurrentPageLink(list: ShallowRef<ComponentPublicInstance | null>): void {
  const unwatch = watchEffect(() => {
    const currentPageLink = list?.value?.$el?.querySelector?.('[aria-current="page"]')

    if (currentPageLink) {
      currentPageLink?.scrollIntoView()
      unwatch()
    }
  })
}
