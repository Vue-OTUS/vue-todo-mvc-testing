import type { Todo } from '@/TodoApp/types'

export function loadTodos(): Promise<Todo[]> {
  return new Promise((res) => {
    const encodedTodos = localStorage.getItem('todos')
    if (!encodedTodos) {
      return res([])
    }

    setTimeout(() => res(JSON.parse(encodedTodos)), 450)
  })
}
