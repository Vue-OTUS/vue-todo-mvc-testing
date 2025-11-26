<template>
  <footer class="footer" style="">
    <span class="todo-count"><strong>2</strong> items left </span>
    <ul class="filters">
      <li>
        <a
          aria-current="page"
          href="#/"
          class="router-link-active router-link-exact-active selected"
          >All</a
        >
      </li>
      <li><a href="#/active" class="">Active</a></li>
      <li><a href="#/completed" class="">Completed</a></li>
    </ul>
    <button class="clear-completed" style="display: none">Clear Completed</button>
  </footer>
</template>

<script setup lang="ts"></script>
