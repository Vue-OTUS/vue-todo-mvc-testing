import type { Todo } from '@/TodoApp/types'

export async function loadTodos() {
  return new Promise<Todo[]>((res) => {
    const encodedTodos = localStorage.getItem('todos')
    if (!encodedTodos) {
      return res([])
    }

    setTimeout(() => res(JSON.parse(encodedTodos)), 450)
  })
}
