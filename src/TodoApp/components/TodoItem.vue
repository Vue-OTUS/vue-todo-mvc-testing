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
        @input="$emit('toggle', !todo.isCompleted)"
      />
      <label>{{ todo.title }}</label>
      <button
        class="destroy"
        @click="$emit('remove-todo')"
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

const id = useId()

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits<{
  (e: 'toggle', payload: boolean): void
  (e: 'remove-todo'): void
  (e: 'update-title', payload: string): void
}>()

const isEditing = ref(false)

const text = ref(props.todo.title)

const inputEl = useTemplateRef('input')

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
  emit('update-title', text.value)
}
</script>
