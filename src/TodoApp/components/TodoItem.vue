<template>
  <li
    :class="{ completed: todo.isCompleted, editing: isEditing }"
    @dblclick="startEditing()"
  >
    <div class="view">
      <input
        type="checkbox"
        class="toggle"
        :checked="todo.isCompleted"
        @input="toggle"
      />
      <label>{{ todo.title }}</label>
      <button
        class="destroy"
        @click="todoStore.removeTodo(todo.id)"
      ></button>
    </div>
    <div class="input-container">
      <input
        :id="id"
        type="text"
        v-model="text"
        class="edit"
        @keyup.enter="saveTitle"
        @keyup.escape="stopEditing"
        @blur="stopEditing"
        ref="input"
      />
      <label
        class="visually-hidden"
        :for="id"
        >Edit Todo Input</label
      >
    </div>
  </li>
</template>

<script setup lang="ts">
import { nextTick, ref, useId, useTemplateRef } from 'vue'
import type { Todo } from '../types'
import { useTodoStore } from '@/stores/todos'

const id = useId()

const props = defineProps<{ todo: Todo }>()

const todoStore = useTodoStore()

const isEditing = ref(false)

const text = ref(props.todo.title)

const inputEl = useTemplateRef('input')

function toggle() {
  todoStore.setIsCompleted(props.todo.id, !props.todo.isCompleted)
}

function startEditing() {
  isEditing.value = true
  nextTick().then(() => inputEl.value?.focus())
}

function stopEditing() {
  isEditing.value = false
  text.value = props.todo.title
}

function saveTitle() {
  isEditing.value = false
  todoStore.updateTitle(props.todo.id, text.value)
}
</script>
