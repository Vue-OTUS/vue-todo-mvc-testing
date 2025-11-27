import { type Todo } from '@/TodoApp/types'

export function getTodo(data: Partial<Todo> = {}): Todo {
  const _id = data.id ?? Math.random().toString()

  return { id: _id, title: 'todo title' + _id, isCompleted: false, ...data }
}
