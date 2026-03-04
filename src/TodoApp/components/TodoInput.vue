<template>
  <header class="header">
    <h1>todos</h1>
    <input
      v-model="text"
      data-testid="todo-input"
      type="text"
      class="new-todo"
      autocomplete="off"
      placeholder="What needs to be done?"
      @keyup.enter="addTodo"
    />
  </header>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todos'
import { ref } from 'vue'

const text = ref('')
const todoStore = useTodoStore()

function addTodo() {
  todoStore.addTodo({
    id: Math.random().toString(),
    title: text.value,
    isCompleted: false,
  })

  text.value = ''
}
</script>
