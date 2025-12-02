import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test.describe('TodoApp', () => {
  test('visits the app root url', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toHaveText('todos')
  })

  test('create, edit, delete todo', async ({ page }) => {
    await page.goto('/')

    await page.getByPlaceholder('What needs to be done?').fill('My First Todo')
    await page.getByPlaceholder('What needs to be done?').press('Enter')

    await expect(page.locator('.todo-list')).toContainText('My First Todo')
    await page.locator('.todo-list').getByText('My First Todo').dblclick()

    await page.locator('.todo-list').locator('li.editing').getByRole('textbox').fill('Updated todo')
    await page.locator('.todo-list').locator('li.editing').getByRole('textbox').press('Enter')

    await expect(page.locator('.todo-list')).toContainText('Updated todo')
  })

  test('codegen gerated test', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible()

    await page.getByRole('textbox', { name: 'What needs to be done?' }).click()
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('My First Todo')
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter')

    await expect(page.getByText('My First Todo')).toBeVisible()
    await expect(page.locator('footer')).toContainText('1 items left')

    await page.getByText('My First Todo').dblclick()
    await page.getByRole('textbox', { name: 'Edit Todo Input' }).press('ControlOrMeta+a')
    await page.getByRole('textbox', { name: 'Edit Todo Input' }).fill('Updated todo')
    await page.getByRole('textbox', { name: 'Edit Todo Input' }).press('Enter')
    await expect(page.getByText('Updated todo')).toBeVisible()
    await page.locator('[data-test-id="toggleCheckbox"]').check()

    await expect(page.locator('li', { hasText: 'Updated todo' })).toHaveClass('completed')

    await page.locator('[data-test-id="toggleCheckbox"]').uncheck()
    await page.getByRole('link', { name: 'Active' }).click()
    await expect(page.getByText('Updated todo')).toBeVisible()
    await page.getByRole('link', { name: 'Completed' }).click()
    await page.getByRole('link', { name: 'All' }).click()
    await page.locator('[data-test-id="destroyBtn"]').click()
    await expect(page.locator('footer')).toContainText('0 items left')
  })
})
