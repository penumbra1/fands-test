import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TreeList from './TreeList.vue'

describe('TreeList', () => {
  it('renders nothing when empty', () => {
    const wrapper = mount(TreeList)
    expect(wrapper.html()).toBe('')
  })
})
