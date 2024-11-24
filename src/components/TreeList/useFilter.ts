import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'

const debounceDelay = 250

export function useFilter(
  rootValues: string[],
  getChildren: (value: string) => string[] | undefined,
) {
  const filteredValues = ref<Set<string>>()

  function updateFilteredValues(filter: string) {
    if (filter === '') {
      filteredValues.value = undefined
    } else {
      filteredValues.value = new Set()

      const filterRegExp = new RegExp(filter, 'i')

      function checkFilterMatch(value: string) {
        if (filteredValues.value?.has(value)) return true

        if (
          value.match(filterRegExp) ||
          getChildren(value)?.some((child) => checkFilterMatch(child))
        ) {
          filteredValues.value?.add(value)
          return true
        }

        return false
      }

      for (const value of rootValues) {
        checkFilterMatch(value)
      }
    }
  }

  const updateFilter = useDebounceFn(updateFilteredValues, debounceDelay)

  function matchesFilter(value: string) {
    return !filteredValues.value || filteredValues.value.has(value)
  }

  return { filteredValues, updateFilter, matchesFilter }
}
