<template>
  <ul class="todo-list">
    <TodoItem v-for="i in [1, 2, 3]" :key="i"></TodoItem>
  </ul>
</template>

<script setup lang="ts">
import TodoItem from './TodoItem.vue'
</script>
