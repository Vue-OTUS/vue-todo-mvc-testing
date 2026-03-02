import type { Todo } from '@/TodoApp/types'

export function getTodo(data: Partial<Todo> = {}): Todo {
  const _id = data.id ?? Math.random().toString()

  return { id: _id, title: 'new Todo ' + _id, isCompleted: false, ...data }
}
