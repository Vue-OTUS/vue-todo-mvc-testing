import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('create, edit, toggle, delete todo', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('h1')).toHaveText('todos')
  const input = page.getByPlaceholder('What needs to be done?')

  const newTodoTitle = 'New Todo'
  await input.fill(newTodoTitle)
  await input.press('Enter')

  await expect(page.locator('.todo-list')).toContainText(newTodoTitle)

  const todoLi = page.locator('.todo-list li', { hasText: newTodoTitle })

  await todoLi.locator('label').getByText(newTodoTitle).dblclick()

  await expect(todoLi).toHaveClass('editing')

  await expect(todoLi.getByRole('textbox')).toBeVisible()
  await todoLi.getByRole('textbox').focus()

  const updatedText = 'updated value'

  await todoLi.getByRole('textbox').fill(updatedText)
  await todoLi.getByRole('textbox').press('Enter')

  await expect(page.locator('.todo-list li')).toContainText(updatedText)
})

test('codegen', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible()

  await page.getByTestId('todo-input').click()
  await page.getByTestId('todo-input').fill('sdfg')
  await page.getByTestId('todo-input').press('Enter')

  await page.locator('.todo-list li').hover()
  await expect(page.getByTestId('delete-todo-button')).toBeVisible()

  await page.getByText('sdfg').click()
  await expect(page.getByText('sdfg')).toBeVisible()
  await page.getByTestId('delete-todo-button').click()
})
