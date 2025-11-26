import { TodoFilter, type Todo, type TodoId } from '@/TodoApp/types'
import { defineStore } from 'pinia'
import { computed, reactive, readonly, watch } from 'vue'
import * as loadTodoService from '@/services/loadTodos'

export const useTodoStore = defineStore('todo', () => {
  const todos = reactive<Todo[]>([])
  watch(todos, () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  })

  function addTodo(todo: Todo) {
    todos.push(todo)
  }

  function removeTodo(id: TodoId) {
    const index = todos.findIndex((t) => t.id === id)

    if (!index) {
      return
    }

    todos.splice(index, 1)
  }

  function updateTitle(id: TodoId, newTitle: string) {
    const todo = todos.find((t) => t.id === id)

    if (!todo) {
      return
    }

    todo.title = newTitle
  }

  function setIsCompleted(id: TodoId, newIsCompleted: boolean) {
    const todo = todos.find((t) => t.id === id)

    if (!todo) {
      return
    }

    todo.isCompleted = newIsCompleted
  }

  function getFilteredByStatus(filter: TodoFilter) {
    switch (filter) {
      case TodoFilter.All:
        return todos
      case TodoFilter.Active:
        return todos.filter((t) => !t.isCompleted)
      case TodoFilter.Completed:
        return todos.filter((t) => t.isCompleted)
    }
  }

  async function loadTodos() {
    const loadedTodos = await loadTodoService.loadTodos()
    todos.length = 0
    Object.assign(todos, loadedTodos)
  }

  const leftItems = computed(() => todos.filter((t) => !t.isCompleted).length)

  function clearCompleted() {
    const newTodos = getFilteredByStatus(TodoFilter.Active)
    todos.length = 0
    Object.assign(todos, newTodos)
  }

  return {
    todos: readonly(todos),
    addTodo,
    removeTodo,
    updateTitle,
    setIsCompleted,
    leftItems,
    loadTodos,
    getFilteredByStatus,
    clearCompleted,
  }
})
