import { describe, expect, it } from 'vitest'
import TodoItem from '../TodoItem.vue'
import { mount } from '@vue/test-utils'
import type { Todo } from '@/TodoApp/types.ts'
import { getTodo } from './todoItemGenerator.ts'

describe('TodoItem', () => {
  it('renders label', () => {
    // 1. Arrange
    const title = 'my own todo'
    const todo: Todo = getTodo({ title })

    // 2. Act
    const wrapper = mount(TodoItem, {
      props: {
        todo,
      },
    })

    // 3. Assert
    expect(wrapper.text()).toContain(title)
  })

  describe('is completed', () => {
    it('has completed class', () => {
      // 1. Arrange
      const todo: Todo = getTodo({ isCompleted: true })

      // 2. Act
      const wrapper = mount(TodoItem, {
        props: {
          todo,
        },
      })

      // 3. Assert
      expect(wrapper.classes()).toContain('completed')
    })
  })

  describe('is NOT completed', () => {
    it('has no completed class', () => {
      // 1. Arrange
      const todo: Todo = getTodo({ isCompleted: false })

      // 2. Act
      const wrapper = mount(TodoItem, {
        props: {
          todo,
        },
      })

      // 3. Assert
      expect(wrapper.classes()).not.toContain('completed')
    })
  })

  describe('editing', () => {
    it('has editing class on double click', async () => {
      const todo: Todo = getTodo()

      // 2. Act
      const wrapper = mount(TodoItem, {
        props: {
          todo,
        },
      })

      await wrapper.trigger('dblclick')

      // 3. Assert
      expect(wrapper.classes()).toContain('editing')
    })

    it('emits update-title on editing finishing', async () => {
      const todo: Todo = getTodo()
      const updatedTitle = 'updated todo title'

      // 2. Act
      const wrapper = mount(TodoItem, {
        props: {
          todo,
        },
      })

      const input = wrapper.find('input[type="text"]')
      await input.setValue(updatedTitle)
      await input.trigger('keyup.enter')

      // 3. Assert
      expect(wrapper.emitted('update-title')?.flatMap((v) => v)).toContain(updatedTitle)
    })
  })
})
