import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { getTodo } from '../components/__tests__/todoItemGenerator'
import { useTodoStore } from '../../stores/todos'
import { mount } from '@vue/test-utils'
import TodoApp from '../TodoApp.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../../router/index.ts'
import TodoItem from '../components/TodoItem.vue'
import { TodoFilter } from '../types.ts'

import { loadTodos } from '../../services/loadTodos.ts'

describe('TodoApp', () => {
  it('renders all todos', async () => {
    const store = useTodoStore()
    const todo1 = getTodo({ isCompleted: true })
    const todo2 = getTodo({ isCompleted: false })

    const router = getRouter()

    router.push('/')
    await router.isReady()

    store.addTodo(todo1)
    store.addTodo(todo2)

    const wrapper = mount(TodoApp, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.findAllComponents(TodoItem)).toHaveLength(2)
  })

  it('renders only completed', async () => {
    const store = useTodoStore()
    const todo1 = getTodo({ isCompleted: true })
    const todo2 = getTodo({ isCompleted: false })

    const router = getRouter()

    router.push({ name: TodoFilter.Completed })
    await router.isReady()

    store.addTodo(todo1)
    store.addTodo(todo2)

    const wrapper = mount(TodoApp, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.findAllComponents(TodoItem)).toHaveLength(1)
  })

  it('renders loaded todos', async () => {
    vi.mock(import('../../services/loadTodos.ts'), () => {
      return {
        loadTodos: vi.fn().mockResolvedValue([getTodo({ title: 'my todo' })]),
      }
    })

    const router = getRouter()

    router.push({ name: TodoFilter.All })
    await router.isReady()

    const wrapper = mount(TodoApp, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.vm.$nextTick()

    expect(loadTodos).toHaveBeenCalled()

    expect(wrapper.findAllComponents(TodoItem)).toHaveLength(1)
    expect(wrapper.text()).toContain('my todo')
  })
})

function getRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: routes,
  })
}
