<template>
  <section class="todoapp" data-v-app="">
    <header class="header">
      <a aria-current="page" href="#/" class="router-link-active router-link-exact-active"
        ><h1>todos</h1></a
      ><input
        type="text"
        class="new-todo"
        autocomplete="off"
        placeholder="What needs to be done?"
      />
    </header>
    <main class="main" style="">
      <div class="toggle-all-container">
        <input type="checkbox" id="toggle-all-input" class="toggle-all" /><label
          class="toggle-all-label"
          for="toggle-all-input"
        >
          Toggle All Input
        </label>
      </div>
      <ul class="todo-list">
        <li class="">
          <div class="view">
            <input type="checkbox" class="toggle" /><label>first</label
            ><button class="destroy"></button>
          </div>
          <div class="input-container">
            <input id="edit-todo-input" type="text" class="edit" /><label
              class="visually-hidden"
              for="edit-todo-input"
              >Edit Todo Input</label
            >
          </div>
        </li>
        <li class="">
          <div class="view">
            <input type="checkbox" class="toggle" /><label>second</label
            ><button class="destroy"></button>
          </div>
          <div class="input-container">
            <input id="edit-todo-input" type="text" class="edit" /><label
              class="visually-hidden"
              for="edit-todo-input"
              >Edit Todo Input</label
            >
          </div>
        </li>
      </ul>
    </main>
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
  </section>
</template>

<script setup lang="ts"></script>

<style src="@/style.css"></style>
