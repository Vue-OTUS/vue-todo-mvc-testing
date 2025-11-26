<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{ todoStore.leftItems }}</strong> items left
    </span>
    <ul class="filters">
      <li>
        <router-link :to="{ name: TodoFilter.All }">All</router-link>
      </li>
      <li>
        <router-link :to="{ name: TodoFilter.Active }">Active</router-link>
      </li>
      <li>
        <router-link :to="{ name: TodoFilter.Completed }">Completed</router-link>
      </li>
    </ul>
    <button
      class="clear-completed"
      @click="todoStore.clearCompleted()"
    >
      Clear Completed
    </button>
  </footer>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todos'
import { TodoFilter } from '../types'

const todoStore = useTodoStore()
</script>
