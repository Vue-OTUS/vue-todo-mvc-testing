import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { getTodo } from '../components/__tests__/todoItemGenerator'
import { useTodoStore } from '../../stores/todos'
import { mount } from '@vue/test-utils'
import TodoApp from '../TodoApp.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../../router/index.ts'
import TodoItem from '../components/TodoItem.vue'
import { TodoFilter } from '../types.ts'

describe('TodoApp', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

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
})

function getRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: routes,
  })
}
