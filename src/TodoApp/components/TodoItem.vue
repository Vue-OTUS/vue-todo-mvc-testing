<template>
  <li>
    <div class="view">
      <input type="checkbox" class="toggle" /><label>first</label><button class="destroy"></button>
    </div>
    <div class="input-container">
      <input id="edit-todo-input" type="text" class="edit" /><label
        class="visually-hidden"
        for="edit-todo-input"
        >Edit Todo Input</label
      >
    </div>
  </li>
</template>

<script setup lang="ts"></script>
