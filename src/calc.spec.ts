import { test, expect, describe, it, beforeEach } from 'vitest'

function sum(a: number, b: number) {
  return a + b
}

describe('sum function', () => {
  describe('positive', () => {
    it.each([
      [1, 3, 4],
      [1, 1, 2],
    ])('should work fine %s + %s = %s', (a, b, expected) => {
      // 2. Act
      const actual = sum(a, b)

      // 3. Assert

      expect(actual).toBe(expected)
    })
  })

  test('1 + -3 = -1', () => {
    // 1. Arrange
    const a = 1
    const b = -3
    const expected = -2

    // 2. Act
    const actual = sum(a, b)

    // 3. Assert

    expect(actual).toBe(expected)
  })

  test('1 + 0 = 1', () => {
    // 1. Arrange
    const a = 1
    const b = 0
    const expected = 1

    // 2. Act
    const actual = sum(a, b)

    // 3. Assert

    expect(actual).toBe(expected)
  })
})
