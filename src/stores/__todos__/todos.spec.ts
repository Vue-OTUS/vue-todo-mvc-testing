import { beforeEach, describe, expect, it } from 'vitest'
import { useTodoStore } from '../todos'
import { getTodo } from '../../TodoApp/components/__tests__/todoItemGenerator'

describe('Todo Pinia Store', () => {
  it('adds todo', () => {
    const store = useTodoStore()
    const todo = getTodo()

    store.addTodo(todo)

    expect(store.todos).toContainEqual(todo)
  })

  it('counts left items', () => {
    const store = useTodoStore()
    const todo1 = getTodo({ isCompleted: false })
    const todo2 = getTodo({ isCompleted: true })

    store.addTodo(todo1)
    store.addTodo(todo2)

    expect(store.leftItems).toBe(1)
  })
})
