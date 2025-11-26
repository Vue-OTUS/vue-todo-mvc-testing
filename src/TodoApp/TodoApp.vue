<template>
  <section class="todoapp">
    <TodoInput></TodoInput>
    <main class="main" style="">
      <ToggleAll></ToggleAll>
      <TodoList></TodoList>
    </main>
    <TodoFilters></TodoFilters>
  </section>
</template>

<script setup lang="ts">
import TodoFilters from './components/TodoFilters.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import ToggleAll from './components/ToggleAll.vue'
</script>

<style src="@/style.css"></style>
