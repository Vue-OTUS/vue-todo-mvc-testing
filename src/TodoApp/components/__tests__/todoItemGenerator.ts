import type { Todo } from '@/TodoApp/types'

export function getTodo(data: Partial<Todo> = {}): Todo {
  return {
    id: 'id_' + Math.random(),
    isCompleted: false,
    title: 'my todo ' + Math.random(),
    ...data,
  }
}
