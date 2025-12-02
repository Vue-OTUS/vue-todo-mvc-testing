import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

function sum(a: number, b: number) {
  return a + b
}

describe('Calculator', () => {
  it.each([
    [1, 2, 3],
    [-1, -2, -3],
  ])('sum is correct %s %s %s', (a, b, expected) => {
    const actual = sum(a, b)

    expect(actual).toBe(expected)
  })
})
