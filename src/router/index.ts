import TodoApp from '@/TodoApp/TodoApp.vue'
import { TodoFilter } from '@/TodoApp/types'
import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: TodoFilter.All,
    component: TodoApp,
  },
  {
    path: '/completed',
    name: TodoFilter.Completed,
    component: TodoApp,
  },
  {
    path: '/active',
    name: TodoFilter.Active,
    component: TodoApp,
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})
