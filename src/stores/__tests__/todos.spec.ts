import { beforeEach, describe, expect, it, test } from 'vitest'
import { useTodoStore } from '../todos'
import { createPinia, setActivePinia } from 'pinia'
import { getTodo } from 'tests/providers/todo'

describe('Todo Pinia Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('addTodo', () => {
    it('should add todo', () => {
      const store = useTodoStore()
      const expectedTodo = getTodo()

      store.addTodo(expectedTodo)

      expect(store.todos.length).toBe(1)
      expect(store.todos[0]).toStrictEqual(expectedTodo)
    })
  })

  describe('remoteTodo', () => {
    it('should add the first todo', () => {
      const store = useTodoStore()
      const expectedTodo = getTodo()
      store.addTodo(expectedTodo)

      store.removeTodo(expectedTodo.id)

      expect(store.todos.length).toBe(0)
    })

    it('should add the third todo', () => {
      const store = useTodoStore()
      store.addTodo(getTodo())
      store.addTodo(getTodo())
      const expectedTodo = getTodo()
      store.addTodo(expectedTodo)

      store.removeTodo(expectedTodo.id)

      expect(store.todos.length).toBe(2)
    })
  })

  describe('leftItems', () => {
    test('0 todos', () => {
      // 1. Arrange
      const store = useTodoStore()
      const expectedLeftItems = 0

      // 2. Act
      const actual = store.leftItems

      // 3. Assert
      expect(actual).toBe(expectedLeftItems)
    })

    test('one active todo', () => {
      // 1. Arrange
      const store = useTodoStore()
      store.addTodo(getTodo())
      const expectedLeftItems = 1

      // 2. Act
      const actual = store.leftItems

      // 3. Assert
      expect(actual).toBe(expectedLeftItems)
    })

    test('3 active todos', () => {
      // 1. Arrange
      const store = useTodoStore()
      store.addTodo(getTodo())
      store.addTodo(getTodo())
      store.addTodo(getTodo())
      const expectedLeftItems = 3

      // 2. Act
      const actual = store.leftItems

      // 3. Assert
      expect(actual).toBe(expectedLeftItems)
    })

    test('3 active, 2 completed todos', () => {
      // 1. Arrange
      const store = useTodoStore()
      store.addTodo(getTodo())
      store.addTodo(getTodo())
      store.addTodo(getTodo())
      store.addTodo(getTodo({ isCompleted: true }))
      store.addTodo(getTodo({ isCompleted: true }))
      const expectedLeftItems = 3

      // 2. Act
      const actual = store.leftItems

      // 3. Assert
      expect(actual).toBe(expectedLeftItems)
    })
  })
})
