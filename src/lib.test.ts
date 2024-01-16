import { expect, test } from 'vitest'
import { h } from './lib'

test('adds 1 + 2 to equal 3', () => {
  expect(h()).toBe('Hello world')
})
