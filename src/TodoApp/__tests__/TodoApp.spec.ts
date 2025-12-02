import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, type Mock, vi } from 'vitest'
import TodoApp from '../TodoApp.vue'
import router from '@/router/index'
import { TodoFilter, type Todo } from '../types'
import { useTodoStore } from '@/stores/todos'
import { getTodo } from 'tests/providers/todo'
import { loadTodos } from '@/services/loadTodos'
import { nextTick } from 'vue'

describe('TodoApp', () => {
  it('should display todos', async () => {
    router.push({ name: TodoFilter.All })
    await router.isReady()

    const store = useTodoStore()
    const todo = getTodo()
    store.addTodo(todo)

    const wrapper = mount(TodoApp, { global: { plugins: [router] } })

    expect(wrapper.text()).toContain(todo.title)
  })

  it('should remove todo', async () => {
    router.push({ name: TodoFilter.All })
    await router.isReady()

    const store = useTodoStore()
    const todo = getTodo()
    store.addTodo(todo)

    const wrapper = mount(TodoApp, { global: { plugins: [router] } })

    await wrapper.find('[data-test-id="destroyBtn"]').trigger('click')

    expect(wrapper.text()).not.toContain(todo.title)
  })

  it('should add todo', async () => {
    router.push({ name: TodoFilter.All })
    await router.isReady()

    const wrapper = mount(TodoApp, { global: { plugins: [router] } })

    const input = wrapper.find('.new-todo')
    await input.setValue('new todo')
    await input.trigger('keyup.enter')

    expect(wrapper.text()).toContain('new todo')
  })

  it('should check todo', async () => {
    router.push({ name: TodoFilter.All })
    await router.isReady()

    const wrapper = mount(TodoApp, { global: { plugins: [router] } })

    const input = wrapper.find('.new-todo')
    await input.setValue('new todo')
    await input.trigger('keyup.enter')

    await wrapper.find('[data-test-id="toggleCheckbox"]').trigger('input')

    expect(wrapper.find('li.completed').exists()).toBe(true)
  })

  describe('mocked external service', () => {
    vi.mock(import('@/services/loadTodos'), () => {
      return {
        loadTodos: vi.fn().mockResolvedValue([{ title: 'todo1' }, { title: 'todo2' }]),
      }
    })

    it('should load todo from external storage', async () => {
      router.push({ name: TodoFilter.All })
      await router.isReady()

      const wrapper = mount(TodoApp, { global: { plugins: [router] } })

      await nextTick()

      expect(wrapper.text()).toContain('todo1')
      expect(wrapper.text()).toContain('todo2')
    })
  })
})
