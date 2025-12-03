import { test, expect } from '@playwright/test';
import { ToDoPage } from "../pages/todo-page";

let toDoPage: ToDoPage

test.beforeEach(async ({ page }) => {
  toDoPage = new ToDoPage(page)
  await toDoPage.open()
})

test('verify to do task  creation', async ({ page }) => {
  await toDoPage.createTask();
  await toDoPage.verifyTaskIsVisible();
});

test('verify two task creation', async ({ page }) => {
  await toDoPage.createTask();
  await toDoPage.createTask();
  await toDoPage.getTaskCount(2);
});

test('verify completed filter', async ({ page }) => {
  await toDoPage.createTask();
  await toDoPage.createTask();
  await toDoPage.clickFilterCompleted();
  await toDoPage.getTaskCount(0);
});

test('verify active filter', async ({ page }) => {
  await toDoPage.createTask();
  await toDoPage.createTask();
  await toDoPage.clickFilterActive();
  await toDoPage.getTaskCount(2);
});

test('verify all filter', async ({ page }) => {
  await toDoPage.createTask();
  await toDoPage.createTask();
  await toDoPage.clickFilterAll();
  await toDoPage.getTaskCount(2);
});

test('verify active filter for completed task', async ({ page }) => {
  await toDoPage.createTask();
  await toDoPage.clickItemToggle();
  await toDoPage.clickFilterActive();
  await toDoPage.getTaskCount(0);
  await toDoPage.clickFilterCompleted();
  await toDoPage.getTaskCount(1);
});

test('verify clear completed button', async ({ page }) => {
  await toDoPage.createTask();
  await toDoPage.getTaskCount(1);
  await toDoPage.clickItemToggle();
  await toDoPage.clickClearCompleted();
  await toDoPage.getTaskCount(0);
});

test('verify deletion of a task', async ({ page }) => {
  await toDoPage.createTask();
  await toDoPage.getTaskCount(1);
  await toDoPage.deleteTask();
  await toDoPage.getTaskCount(0);
});

test('verify after task is deleted only one task is visible', async ({ page }) => {
  await toDoPage.createTask();
  await toDoPage.createTask();
  await toDoPage.deleteTaskByIndex(1);
  await toDoPage.getTaskCount(1);
});

test('edit task name with double click', async ({ page }) => {
  await toDoPage.createTask();
  await toDoPage.dblClick(toDoPage.taskNameField);
  await toDoPage.editTaskName();
});
