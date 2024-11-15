import { watchOnce } from "@vueuse/core";
import { useTemplateRef } from "vue";
import type TreeList from "../TreeList/TreeList.vue";

const refKey = 'treelist'

export function useScrollCurentPageIntoView() {
  const list = useTemplateRef<InstanceType<typeof TreeList>
>(refKey)

  watchOnce(list, () => {
    if (list.value) {
      const currentLink = list.value.$el.querySelector("[aria-current='page']")
      currentLink?.scrollIntoView({ behavior: 'smooth' })
    }
  })

  return refKey
}