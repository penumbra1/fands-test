import { mapPageKeyByLink } from '../mapPageKeyByLink'

describe('findPageAncestors', () => {
  test('returns an empty mapping when no pages are provided', () => {
    expect(mapPageKeyByLink({})).toEqual({})
  })

  test('returns the correct mapping', () => {
    const pages = {
      one: { key: 'one', name: 'One', level: 0, link: 'one.html' },
      two: { key: 'two', name: 'Два', level: 0, link: 'dva.html' },
    }

    expect(mapPageKeyByLink(pages)).toEqual({ 'one.html': 'one', 'dva.html': 'two' })
  })
})
