import {expect, Locator, Page} from "@playwright/test";
import { faker } from '@faker-js/faker/locale/en'

export class ToDoPage {
    readonly toDoPage: Page
    readonly url: string
    readonly taskNameField: Locator
    readonly ItemToggle: Locator
    readonly ItemButton: Locator
    readonly ItemLabel: Locator
    readonly filterCompleted: Locator
    readonly filterActive: Locator
    readonly filterAll: Locator
    readonly clearCompleted: Locator

    public constructor(page: Page) {
        this.toDoPage = page
        this.url = "https://todo-app.tallinn-learning.ee/#/"
        this.taskNameField = page.getByTestId('text-input')
        this.ItemToggle = page.getByTestId('todo-item-toggle')
        this.ItemButton = page.getByTestId('todo-item-button')
        this.ItemLabel = page.getByTestId('todo-item-label')
        this.filterCompleted = page.getByRole('link', { name: 'Completed' })
        this.filterActive = page.getByRole('link', { name: 'Active' })
        this.filterAll = page.getByRole('link', { name: 'All' })
        this.clearCompleted = page.getByRole('button', { name: 'Clear completed' })
    }

    async open() {
        await this.toDoPage.goto(this.url)
    }

    async createTask() {
        const taskName = faker.lorem.words(3);
        await this.taskNameField.fill(taskName)
        await this.taskNameField.press('Enter')
        return taskName;
    }

    async deleteTask() {
        await this.ItemToggle.click()
        await this.ItemButton.hover()
        await this.ItemButton.click()
    }

    async deleteTaskByIndex(index: number) {
        await this.ItemLabel.nth(index).hover();
        await this.ItemButton.nth(index).click()
    }

    async getTaskCount(count: number) {
        await expect (this.ItemLabel).toHaveCount(count)
    }

    async clickFilterCompleted() {
        await this.filterCompleted.click()
    }

    async clickFilterActive() {
        await this.filterActive.click()
    }

    async clickFilterAll() {
        await this.filterAll.click()
    }

    async verifyTaskIsVisible() {
        await expect(this.ItemLabel).toBeVisible()
    }

    async clickItemToggle() {
        await this.ItemToggle.click()
    }

    async clickClearCompleted() {
        await this.clearCompleted.click()
    }

    async dblClick(Locator: Locator) {
        await Locator.dblclick()
    }

    async editTaskName() {
        const newTaskName = faker.lorem.words(4)
        await this.ItemLabel.press('Control+A');   // выделяем весь текст
        await this.ItemLabel.press('Backspace');   // удаляем
        await this.taskNameField.fill(newTaskName)
        await this.taskNameField.press('Enter')
    }
}
