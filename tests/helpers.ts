import { expect, type Page } from "@playwright/test";

export async function waitForSplash(page: Page) {
  await expect(page.getByText("Personal finance & budgeting")).toBeVisible();
  await expect(page.getByText("Personal finance & budgeting")).toBeHidden({
    timeout: 5000,
  });
}

export async function completeOnboarding(page: Page) {
  await waitForSplash(page);
  await page.getByPlaceholder("Your name").fill("Test User");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: /BRL/ }).click();
  await page.getByRole("button", { name: /USD/ }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("textbox", { name: "Currency" }).click();
  await page.getByRole("option", { name: /BRL/ }).click();
  await page.getByPlaceholder("Checking Account").fill("Wallet");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByPlaceholder("Checking Account").fill("Bank");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Open Finance" }).click();
  await expect(page.getByText("Hi, Test User")).toBeVisible();
}

export async function navigateToSettings(page: Page, section: string) {
  await page.getByRole("button", { name: "Settings" }).click();
  await page.getByRole("menuitem", { name: section }).click();
}

export async function openImportModal(page: Page) {
  await page.getByRole("button", { name: "Import Statement" }).click();
  await expect(
    page.getByRole("heading", { name: "Import Statement" })
  ).toBeVisible();
}

export async function uploadFile(
  page: Page,
  name: string,
  mimeType: string,
  buffer: Buffer
) {
  const fileChooser = page.waitForEvent("filechooser");
  await page.locator('input[type="file"]').click();
  const chooser = await fileChooser;
  await chooser.setFiles({ name, mimeType, buffer });
}
