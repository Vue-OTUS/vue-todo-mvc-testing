import { beforeEach, describe, expect, it } from 'vitest'
import { type Todo } from '@/TodoApp/types'
import { useTodoStore } from '../todos'
import { createPinia, setActivePinia } from 'pinia'
import { getTodo } from '@/test/providers/todoProvider'

describe('Todos Pinia Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('addTodo', () => {
    it('should add todo', () => {
      const todo: Todo = getTodo()

      const store = useTodoStore()
      store.addTodo(todo)

      const actual = store.todos

      expect(actual).toStrictEqual([todo])
    })
  })

  describe('leftItems', () => {
    it('should return 1 for 1 active todo', () => {
      // 1. Arrange
      const todo: Todo = getTodo()
      const expected = 1
      const store = useTodoStore()
      store.addTodo(todo)

      // 2. Act
      const actual = store.leftItems

      // 3. Assert
      expect(actual).toBe(expected)
    })

    it('should return 1 for 1 active todo and 1 completed todo', () => {
      // 1. Arrange
      const expected = 1
      const store = useTodoStore()
      store.addTodo(getTodo())
      store.addTodo(getTodo({ isCompleted: true }))

      // 2. Act
      const actual = store.leftItems

      // 3. Assert
      expect(actual).toBe(expected)
    })

    it('should return 0 for 2 completed todo', () => {
      // 1. Arrange
      const expected = 0
      const store = useTodoStore()
      store.addTodo(getTodo({ isCompleted: true }))
      store.addTodo(getTodo({ isCompleted: true }))

      // 2. Act
      const actual = store.leftItems

      // 3. Assert
      expect(actual).toBe(expected)
    })
  })
})
