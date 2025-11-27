import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

function sum(a: number, b: number) {
  return a + b
}

describe('Calculator', () => {
  it('sum is correct', () => {
    const a = 1
    const b = 2
    const expected = 3

    const actual = sum(a, b)

    expect(actual).toBe(expected)
  })
})
