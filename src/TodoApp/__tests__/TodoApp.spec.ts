import { beforeAll, beforeEach, it, vi, type Mock } from 'vitest'
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoApp from '../TodoApp.vue'
import { getTodo } from '@/test/providers/todoProvider'
import { routes } from '@/router/index'

import { TodoFilter } from '../types'
import { useTodoStore } from '@/stores/todos'
import TodoItem from '../components/TodoItem.vue'
import TodoList from '../components/TodoList.vue'
import { createRouter, createWebHistory, type Router } from 'vue-router'

describe('TodoApp', () => {
  let router: Router

  const mocks = vi.hoisted(() => {
    return {
      loadTodoMock: vi.fn().mockResolvedValue([]),
    }
  })

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: routes,
    })

    vi.mock(import('../../services/loadTodos'), () => {
      return {
        loadTodos: mocks.loadTodoMock,
      }
    })
  })

  it('should render all todos', async () => {
    router.push({ name: TodoFilter.All })
    await router.isReady()

    const store = useTodoStore()
    store.addTodo(getTodo({ isCompleted: true }))
    store.addTodo(getTodo({ isCompleted: false }))

    const component = mount(TodoApp, {
      global: {
        plugins: [router],
      },
    })

    const todoItemsComponents = component.findAllComponents(TodoItem)

    expect(todoItemsComponents).toHaveLength(2)
  })

  it('should call loadTodos on component mounted', async () => {
    router.push({ name: TodoFilter.All })
    await router.isReady()

    mount(TodoApp, {
      global: {
        plugins: [router],
      },
    })

    const obj = {
      f: () => 1,
    }

    const spy = vi.spyOn(obj, 'f').mockImplementation(() => 2)

    console.log(obj.f())

    expect(mocks.loadTodoMock).toHaveBeenCalled()
    expect(spy).toHaveBeenCalled()
    expect(spy).toReturnWith(2)
  })

  it('should render completed todos', async () => {
    router.replace({ name: TodoFilter.Completed })
    await router.isReady()

    const store = useTodoStore()
    store.addTodo(getTodo({ isCompleted: true }))
    store.addTodo(getTodo({ isCompleted: false }))

    const component = mount(TodoApp, {
      global: {
        plugins: [router],
      },
    })

    const todoItemsComponents = component.findAllComponents(TodoItem)

    expect(todoItemsComponents).toHaveLength(1)
  })
})
