import { mount } from '@vue/test-utils'
import TreeList from '../TreeList.vue'
import { nextTick } from 'vue'

describe('TreeList', () => {
  test('renders nothing when no root values are provided', () => {
    const wrapper = mount(TreeList, {
      props: { rootValues: [], getItemChildren: () => undefined, getItemLabel: (value) => value },
    })

    expect(wrapper.find('li').exists()).toBeFalsy()
  })

  test('renders a nested list with collaped children correctly', () => {
    const rootValues = ['one', 'two', 'three']
    const children: Record<string, string[]> = {
      one: ['one_one', 'one_two'],
      one_one: ['one_one_one'],
      two: ['two_one'],
    }
    const wrapper = mount(TreeList, {
      props: {
        rootValues,
        getItemChildren: (value) => children[value],
        getItemLabel: (value) => value,
      },
      attachTo: document.body,
    })

    // All subtrees are collapsed
    expect(wrapper.findAll("ul[role='group']").filter((el) => el.isVisible())).toHaveLength(0)
  })

  test('renders a nested list with initially expanded children correctly', () => {
    const rootValues = ['one', 'two', 'three']
    const children: Record<string, string[]> = {
      one: ['one_one', 'one_two'],
      one_one: ['one_one_one'],
      two: ['two_one'],
    }
    const wrapper = mount(TreeList, {
      props: {
        rootValues,
        getItemChildren: (value) => children[value],
        getItemLabel: (value) => value,
        initiallyExpandedValues: new Set(['one', 'one_one']),
      },
      attachTo: document.body,
    })

    // Expanded subtrees are visible
    expect(wrapper.findAll("ul[role='group']").filter((el) => el.isVisible())).toHaveLength(2)
    expect(wrapper.find("ul[id='one-subtree']").isVisible()).toBeTruthy()
    expect(wrapper.find("ul[id='one_one-subtree']").isVisible()).toBeTruthy()
  })

  describe('filter', () => {
    vi.mock('@vueuse/core', async (importOriginal) => ({
      ...(await importOriginal()),
      useDebounceFn: (fn: () => void) => fn,
    }))

    test('filters items correctly', async () => {
      const rootValues = ['one', 'two', 'three', 'filter']
      const children: Record<string, string[]> = {
        one: ['one_one', 'one_two_filter'],
        two: ['two_one'],
      }
      const wrapper = mount(TreeList, {
        props: {
          rootValues,
          getItemChildren: (value) => children[value],
          getItemLabel: (value) => value,
        },
        attachTo: document.body,
      })

      const input = wrapper.find('input')
      input.element.value = 'filt'
      input.trigger('input')
      await nextTick()

      // Matching elements and their parents
      expect(wrapper.findAll('li').filter((el) => el.isVisible())).toHaveLength(3)

      // Subtrees that contain matching elements are expanded and display only matching elements
      expect(wrapper.find("ul[id='one-subtree']").isVisible()).toBeTruthy()
      expect(wrapper.find("ul[id='one-subtree']").text()).toBe('one_two_filter')
    })

    test('clears the filter correctly', async () => {
      const rootValues = ['one', 'two', 'three']
      const children: Record<string, string[]> = {
        one: ['one_one', 'one_two_filter'],
        two: ['two_one'],
      }
      const wrapper = mount(TreeList, {
        props: {
          rootValues,
          getItemChildren: (value) => children[value],
          getItemLabel: (value) => value,
        },
        attachTo: document.body,
      })

      const input = wrapper.find('input')
      input.element.value = 'filter'
      input.trigger('input')
      await nextTick()

      // Matching element and its parent
      expect(wrapper.findAll('li').filter((el) => el.isVisible())).toHaveLength(2)
      expect(wrapper.findAll("ul[role='group']").filter((el) => el.isVisible())).toHaveLength(1)
      expect(wrapper.find("ul[id='one-subtree']").isVisible()).toBeTruthy()

      input.element.value = ''
      input.trigger('input')
      await nextTick()

      // Root elements
      expect(wrapper.findAll('li').filter((el) => el.isVisible())).toHaveLength(3)
      // Back to default state with all subtrees collapsed
      expect(wrapper.findAll("ul[role='group']").filter((el) => el.isVisible())).toHaveLength(0)
    })
  })
})
