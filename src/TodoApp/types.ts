export type TodoId = string

export type Todo = {
  id: TodoId
  title: string
  isCompleted: boolean
}

export enum TodoFilter {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}
