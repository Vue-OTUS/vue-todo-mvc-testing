import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro

test('visits the app root url', async ({ page }) => {
  await page.goto('/')

  const input = page.getByPlaceholder('What needs to be done?')
  const initText = 'new todo'

  await input.fill(initText)
  await input.press('Enter')

  let todoItem = page.locator('.todo-list li', { hasText: initText })

  expect(await page.locator('.todo-list li').count()).toBe(1)
  await expect(todoItem).toBeVisible()

  await todoItem.dblclick()

  await expect(todoItem).toHaveClass('editing')

  const todoInput = todoItem.locator('input[type=text]')

  await todoInput.clear()
  const updatedText = 'updated'
  await todoInput.fill(updatedText)
  await todoInput.press('Enter')

  todoItem = page.locator('.todo-list li', { hasText: updatedText })
  await expect(todoItem).not.toHaveClass('editing')

  const checkbox = todoItem.locator('input[type=checkbox]')

  await checkbox.check()
  await expect(todoItem).toHaveClass('completed')

  await expect(page.locator('h1')).toHaveText('todos')
})
