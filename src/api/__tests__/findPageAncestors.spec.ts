import { mockPages } from '@/mocks/mockPages'
import { findPageAncestors } from '../findPageAncestors'

describe('findPageAncestors', () => {
  it('returns an empty list for a root page', () => {
    expect(findPageAncestors(mockPages.pages, 'one')).toEqual([])
  })

  it('returns the correct ancestors for a deeply nested page', () => {
    expect(findPageAncestors(mockPages.pages, 'two_one_one')).toEqual(
      expect.arrayContaining(['two', 'two_one']),
    )
  })
})
