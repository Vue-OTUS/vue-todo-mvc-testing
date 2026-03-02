import { beforeAll, beforeEach, it } from 'vitest'
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoApp from '../TodoApp.vue'
import { getTodo } from '@/test/providers/todoProvider'
import { routes } from '@/router/index'
import { createPinia, setActivePinia } from 'pinia'
import { TodoFilter } from '../types'
import { useTodoStore } from '@/stores/todos'
import TodoItem from '../components/TodoItem.vue'
import TodoList from '../components/TodoList.vue'
import { createRouter, createWebHistory, type Router } from 'vue-router'

describe('TodoApp', () => {
  let router: Router
  beforeEach(() => {
    setActivePinia(createPinia())
    router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: routes,
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
