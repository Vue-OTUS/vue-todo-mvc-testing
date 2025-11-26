<template>
  <section class="todoapp">
    <TodoInput></TodoInput>
    <main
      class="main"
      style=""
    >
      <ToggleAll></ToggleAll>
      <TodoList :todos="todos"></TodoList>
    </main>
    <TodoFilters></TodoFilters>
  </section>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todos'
import TodoFilters from './components/TodoFilters.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import ToggleAll from './components/ToggleAll.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import type { TodoFilter } from './types'

const todoStore = useTodoStore()
todoStore.loadTodos()

const route = useRoute()
const todos = computed(() => todoStore.getFilteredByStatus(route.name as TodoFilter))
</script>

<style src="@/style.css"></style>
