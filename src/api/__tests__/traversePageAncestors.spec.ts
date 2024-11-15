import { mockPages } from '@/mocks/mockPages'
import { traversePageAncestors } from '../traversePageAncestors'

describe('traversePageAncestors', () => {
  it('returns an empty list for a root page', () => {
    expect(traversePageAncestors(mockPages.pages, 'one')).toEqual([])
  })

  it('returns the correct ancestors for a deeply nested page', () => {
    expect(traversePageAncestors(mockPages.pages, 'two_one_one')).toEqual(
      expect.arrayContaining(['two', 'two_one']),
    )
  })
})
