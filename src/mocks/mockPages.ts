import type { GetPagesResponse } from '@/api/types'

export const mockPages: GetPagesResponse = {
  pages: {
    one: {
      key: 'one',
      name: 'One',
      link: 'one.html',
      level: 0,
    },
    two: {
      key: 'two',
      name: 'Two',
      link: 'two.html',
      level: 1,
      childPageKeys: ['two_one', 'two_two'],
    },
    two_one: {
      key: 'two-one',
      name: 'Two one',
      link: 'two-one.html',
      level: 1,
      parentKey: 'two',
      childPageKeys: ['two_one_one', 'two_one_two'],
    },
    two_one_one: {
      key: 'two_one_one',
      name: 'Two one one',
      link: 'two-one-one.html',
      level: 2,
      parentKey: 'two_one',
    },
    two_one_two: {
      key: 'two_one_two',
      name: 'Two one two',
      link: 'two-one-two.html',
      level: 2,
      parentKey: 'two_one',
    },
    two_two: {
      key: 'two_two',
      name: 'Two two',
      link: 'two-two.html',
      level: 1,
      parentKey: 'two',
    },
    three: {
      key: 'three',
      name: 'Three',
      level: 0,
      link: 'three.html',
      childPageKeys: ['three_one'],
    },
    three_one: {
      key: 'three-one',
      name: 'Three one',
      link: 'three-one.html',
      level: 1,
      parentKey: 'three',
    },
  },
  rootLevelKeys: ['one', 'two', 'three'],
}
