import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, test } from 'vitest'
import TodoItem from '../TodoItem.vue'
import { getTodo } from 'tests/providers/todo'
import { setActivePinia, createPinia } from 'pinia'

describe('TodoItem component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should display todo text', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: getTodo({ title: 'my todo' }),
      },
    })

    expect(wrapper.text()).toContain('my todo')
  })

  it('should add editing class on dblclick', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: getTodo(),
      },
    })

    await wrapper.trigger('dblclick')

    expect(wrapper.classes()).toContain('editing')
  })

  it('should add completed class when todo is completed', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: getTodo({ isCompleted: true }),
      },
    })

    expect(wrapper.classes()).toContain('completed')
  })

  it('does not have completed class if todo is not completed', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: getTodo({ isCompleted: false }),
      },
    })

    expect(wrapper.classes()).not.toContain('completed')
  })
})
