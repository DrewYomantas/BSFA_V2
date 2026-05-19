import { describe, expect, it } from 'vitest'
import { snapToIncrement } from '../../src/lib/stoneShop/dimensionSnap.js'

describe('dimension snap', () => {
  it.each([
    [10.03, 1 / 16, 10],
    [10.07, 1 / 8, 10.125],
    [10.12, 1 / 4, 10],
    [10.26, 1 / 2, 10.5],
    [10.49, 1, 10],
    [10.6, 3, 12],
    [14.9, 6, 12],
    [18.1, 12, 24],
  ])('snaps %s to increment %s', (value, increment, expected) => {
    expect(snapToIncrement(value, increment)).toBe(expected)
  })
})
