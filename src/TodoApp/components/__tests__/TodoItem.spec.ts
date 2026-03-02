import { beforeAll, beforeEach, it } from 'vitest'
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoItem from '../TodoItem.vue'
import { getTodo } from '@/test/providers/todoProvider'

describe('TodoItem', () => {
  it('should render todo title', () => {
    const todo = getTodo()

    const component = mount(TodoItem, {
      props: {
        todo: todo,
      },
    })

    const actual = component.find('label').text()

    expect(actual).toBe(todo.title)
  })

  it('should add completed class if todo is completed', () => {
    const todo = getTodo({ isCompleted: true })

    const component = mount(TodoItem, {
      props: {
        todo: todo,
      },
    })

    const actual = component.classes()

    expect(actual).toContain('completed')
  })

  describe('editing todo', () => {
    it('should start editing todo title on dbclick', async () => {
      const todo = getTodo({ isCompleted: true })

      const component = mount(TodoItem, {
        props: {
          todo: todo,
        },
      })

      await component.trigger('dblclick')

      expect(component.classes()).toContain('editing')
    })

    it('should emit update-title on keyup.enter', async () => {
      const todo = getTodo()
      const updatedTitle = 'new todo title'
      const expectedEvent = 'update-title'

      const component = mount(TodoItem, {
        props: {
          todo: todo,
        },
      })

      const input = component.find('input.edit')
      await input.setValue(updatedTitle)
      await input.trigger('keyup.enter')

      expect(component.emitted()).toHaveProperty(expectedEvent)
    })
  })
})
