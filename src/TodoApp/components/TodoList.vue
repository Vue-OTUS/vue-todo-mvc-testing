<template>
  <ul class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="toggle(todo.id, $event)"
      @remove-todo="remove(todo.id)"
      @update-title="updateTitle(todo.id, $event)"
    ></TodoItem>
  </ul>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todos'
import type { Todo, TodoId } from '../types'
import TodoItem from './TodoItem.vue'

defineProps<{ todos: Todo[] }>()

const todoStore = useTodoStore()

function toggle(todoId: TodoId, newState: boolean) {
  todoStore.setIsCompleted(todoId, newState)
}

function updateTitle(todoId: TodoId, newTitle: string) {
  todoStore.updateTitle(todoId, newTitle)
}

function remove(todoId: TodoId) {
  todoStore.removeTodo(todoId)
}
</script>
