import { beforeAll, beforeEach, it } from 'vitest'
import { describe, expect, test } from 'vitest'

function sum(a: number, b: number) {
  return a + b
}

describe('Sum Function', () => {
  test('sum 1 + 2', () => {
    // 1. Arrange
    const a = 1
    const b = 2
    const expected = 3

    // 2. Act
    const actual = sum(a, b)

    // 3. Assert
    expect(actual).toBe(expected)
  })

  test('sum 1 + -2', () => {
    // 1. Arrange
    const a = 1
    const b = -2
    const expected = -1

    // 2. Act
    const actual = sum(a, b)

    // 3. Assert
    expect(actual).toBe(expected)
  })

  it('should sum two numbers', () => {
    // 1. Arrange
    const a = 10
    const b = -2
    const expected = 8

    // 2. Act
    const actual = sum(a, b)

    // 3. Assert
    expect(actual).toBe(expected)
  })
})
