import { test, expect, type Page } from "@playwright/test";
import {
  waitForSplash,
  completeOnboarding,
  navigateToSettings,
} from "./helpers";

// Clear localStorage before each test so each one starts fresh
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/");
});

// ─── Splash Screen ───────────────────────────────────────

test.describe("Splash Screen", () => {
  test("shows splash then transitions to onboarding on first visit", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { name: "Finance" })).toBeVisible();
    await expect(
      page.getByText("Personal finance & budgeting")
    ).toBeVisible();

    // After splash, onboarding should appear
    await expect(page.getByText("Welcome to Finance")).toBeVisible({
      timeout: 5000,
    });
  });

  test("shows splash then goes to app if onboarding is complete", async ({
    page,
  }) => {
    await completeOnboarding(page);

    // Reload — should show splash then app directly
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Finance" })).toBeVisible();
    await expect(page.getByText("Hi, Test User")).toBeVisible({
      timeout: 5000,
    });
  });
});

// ─── Onboarding ──────────────────────────────────────────

test.describe("Onboarding", () => {
  test("requires a name to advance", async ({ page }) => {
    await waitForSplash(page);
    await expect(page.getByRole("button", { name: "Next" })).toBeDisabled();
    await page.getByPlaceholder("Your name").fill("Alice");
    await expect(page.getByRole("button", { name: "Next" })).toBeEnabled();
  });

  test("can add common currencies and a custom one", async ({ page }) => {
    await waitForSplash(page);
    await page.getByPlaceholder("Your name").fill("Alice");
    await page.getByRole("button", { name: "Next" }).click();

    // Add common currency
    await page.getByRole("button", { name: /EUR/ }).click();
    await expect(
      page.getByRole("cell", { name: "EUR", exact: true })
    ).toBeVisible();

    // Button should be disabled after adding
    await expect(page.getByRole("button", { name: /EUR/ })).toBeDisabled();

    // Add custom currency
    await page.getByLabel("Code").fill("ARS");
    await page.getByLabel("Name").fill("Peso");
    await page.getByLabel("Symbol").fill("$");
    await page.getByRole("button", { name: "Add" }).click();

    await expect(
      page.getByRole("cell", { name: "ARS", exact: true })
    ).toBeVisible();
  });

  test("Enter key submits name and advances", async ({ page }) => {
    await waitForSplash(page);
    await page.getByPlaceholder("Your name").fill("Alice");
    await page.getByPlaceholder("Your name").press("Enter");

    // Should be on currencies step
    await expect(
      page.getByText("Pick from common currencies")
    ).toBeVisible();
  });

  test("number keys quick-select currencies", async ({ page }) => {
    await waitForSplash(page);
    await page.getByPlaceholder("Your name").fill("Alice");
    await page.getByRole("button", { name: "Next" }).click();

    // Press "1" to select BRL (first in list)
    await page.keyboard.press("1");
    await expect(
      page.getByRole("cell", { name: "BRL", exact: true })
    ).toBeVisible();

    // Press "2" to select USD
    await page.keyboard.press("2");
    await expect(
      page.getByRole("cell", { name: "USD", exact: true })
    ).toBeVisible();
  });

  test("full onboarding flow", async ({ page }) => {
    await completeOnboarding(page);

    // Verify we're in the app — "All Transactions" heading
    await expect(
      page.getByRole("heading", { name: /Transactions/ })
    ).toBeVisible();
  });
});

// ─── Currencies CRUD ─────────────────────────────────────

test.describe("Currencies", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can navigate to currencies page", async ({ page }) => {
    await navigateToSettings(page, "Currencies");
    await expect(
      page.getByRole("heading", { name: "Currencies" })
    ).toBeVisible();
    // BRL and USD from onboarding should be listed
    await expect(
      page.getByRole("cell", { name: "BRL", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "USD", exact: true })
    ).toBeVisible();
  });

  test("can create a new currency", async ({ page }) => {
    await navigateToSettings(page, "Currencies");
    await page.getByRole("button", { name: /Add Currency/ }).click();

    await page.getByLabel("Code").fill("GBP");
    await page.getByLabel("Name").fill("Pound");
    await page.getByLabel("Symbol").fill("£");
    await page.getByRole("button", { name: "Create" }).click();

    await expect(
      page.getByRole("cell", { name: "GBP", exact: true })
    ).toBeVisible();
  });

  test("can edit a currency", async ({ page }) => {
    await navigateToSettings(page, "Currencies");

    // Click edit on first currency row
    const firstRow = page.getByRole("row").nth(1);
    await firstRow.getByRole("button", { name: "✏" }).click();

    await page.getByLabel("Name").fill("Brazilian Real");
    await page.getByRole("button", { name: "Save" }).click();

    await expect(
      page.getByRole("cell", { name: "Brazilian Real" })
    ).toBeVisible();
  });

  test("can delete a currency", async ({ page }) => {
    await navigateToSettings(page, "Currencies");
    const usdRow = page.getByRole("row").filter({ hasText: "USD" });
    await usdRow.getByRole("button", { name: "✕" }).click();

    await expect(
      page.getByRole("cell", { name: "USD", exact: true })
    ).not.toBeVisible();
  });

  test("Alt+N shortcut opens new currency modal", async ({ page }) => {
    await navigateToSettings(page, "Currencies");
    // Click the body to ensure focus is not on a menu/input
    await page.locator("body").click();
    await page.keyboard.press("Alt+n");
    await expect(page.getByText("New Currency")).toBeVisible();
  });
});

// ─── Accounts CRUD ───────────────────────────────────────

test.describe("Accounts", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can navigate to accounts page and see onboarding accounts", async ({
    page,
  }) => {
    await navigateToSettings(page, "Accounts");
    await expect(
      page.getByRole("heading", { name: "Accounts" })
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Wallet" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Bank" })).toBeVisible();
  });

  test("can create a new account", async ({ page }) => {
    await navigateToSettings(page, "Accounts");
    await page.getByRole("button", { name: /Add Account/ }).click();

    await page.getByLabel("Name").fill("Credit Card");
    // Type defaults to "checking" and Currency defaults to first currency (BRL)
    await page.getByRole("button", { name: "Create" }).click();

    await expect(
      page.getByRole("cell", { name: "Credit Card" })
    ).toBeVisible();
  });

  test("can edit an account", async ({ page }) => {
    await navigateToSettings(page, "Accounts");
    const walletRow = page.getByRole("row").filter({ hasText: "Wallet" });
    await walletRow.getByRole("button", { name: "✏" }).click();

    await page.getByLabel("Name").fill("Cash Wallet");
    await page.getByRole("button", { name: "Save" }).click();

    await expect(
      page.getByRole("cell", { name: "Cash Wallet" })
    ).toBeVisible();
  });

  test("can delete an account", async ({ page }) => {
    await navigateToSettings(page, "Accounts");
    const bankRow = page.getByRole("row").filter({ hasText: "Bank" });
    await bankRow.getByRole("button", { name: "✕" }).click();

    await expect(page.getByRole("cell", { name: "Bank" })).not.toBeVisible();
  });

  test("Alt+N shortcut opens new account modal", async ({ page }) => {
    await navigateToSettings(page, "Accounts");
    await page.locator("body").click();
    await page.keyboard.press("Alt+n");
    await expect(page.getByText("New Account")).toBeVisible();
  });
});

// ─── Categories CRUD ─────────────────────────────────────

test.describe("Categories", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can create a top-level category", async ({ page }) => {
    await navigateToSettings(page, "Categories");
    await page.getByRole("button", { name: /Add Category/ }).click();

    await page.getByLabel("Name").fill("Leisure");
    await page.getByRole("button", { name: "Create" }).click();

    await expect(page.getByRole("cell", { name: "Leisure" })).toBeVisible();
  });

  test("can create a subcategory", async ({ page }) => {
    await navigateToSettings(page, "Categories");

    // Create parent
    await page.getByRole("button", { name: /Add Category/ }).click();
    await page.getByLabel("Name").fill("Leisure");
    await page.getByRole("button", { name: "Create" }).click();

    // Create subcategory via the + button
    const leisureRow = page.getByRole("row").filter({ hasText: "Leisure" });
    await leisureRow.getByRole("button", { name: "+" }).click();
    await page.getByLabel("Name").fill("Cinema");
    // Parent should be pre-selected
    await page.getByRole("button", { name: "Create" }).click();

    await expect(
      page.getByRole("cell", { name: /Leisure → Cinema/ })
    ).toBeVisible();
  });

  test("can edit a category", async ({ page }) => {
    await navigateToSettings(page, "Categories");
    await page.getByRole("button", { name: /Add Category/ }).click();
    await page.getByLabel("Name").fill("Food");
    await page.getByRole("button", { name: "Create" }).click();

    const foodRow = page.getByRole("row").filter({ hasText: "Food" });
    await foodRow.getByRole("button", { name: "✏" }).click();
    await page.getByLabel("Name").fill("Food & Drinks");
    await page.getByRole("button", { name: "Save" }).click();

    await expect(
      page.getByRole("cell", { name: "Food & Drinks" })
    ).toBeVisible();
  });

  test("can delete a category", async ({ page }) => {
    await navigateToSettings(page, "Categories");
    await page.getByRole("button", { name: /Add Category/ }).click();
    await page.getByLabel("Name").fill("Temp");
    await page.getByRole("button", { name: "Create" }).click();

    const tempRow = page.getByRole("row").filter({ hasText: "Temp" });
    await tempRow.getByRole("button", { name: "✕" }).click();

    await expect(page.getByRole("cell", { name: "Temp" })).not.toBeVisible();
  });
});

// ─── Tags CRUD ───────────────────────────────────────────

test.describe("Tags", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can create a tag", async ({ page }) => {
    await navigateToSettings(page, "Tags");
    await page.getByRole("button", { name: /Add Tag/ }).click();
    await page.getByLabel("Name").fill("vacation");
    await page.getByRole("button", { name: "Create" }).click();

    await expect(page.getByRole("cell", { name: "vacation" })).toBeVisible();
  });

  test("can edit a tag", async ({ page }) => {
    await navigateToSettings(page, "Tags");
    await page.getByRole("button", { name: /Add Tag/ }).click();
    await page.getByLabel("Name").fill("trip");
    await page.getByRole("button", { name: "Create" }).click();

    const tripRow = page.getByRole("row").filter({ hasText: "trip" });
    await tripRow.getByRole("button", { name: "✏" }).click();
    await page.getByLabel("Name").fill("travel");
    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByRole("cell", { name: "travel" })).toBeVisible();
  });

  test("can delete a tag", async ({ page }) => {
    await navigateToSettings(page, "Tags");
    await page.getByRole("button", { name: /Add Tag/ }).click();
    await page.getByLabel("Name").fill("remove-me");
    await page.getByRole("button", { name: "Create" }).click();

    const row = page.getByRole("row").filter({ hasText: "remove-me" });
    await row.getByRole("button", { name: "✕" }).click();

    await expect(
      page.getByRole("cell", { name: "remove-me" })
    ).not.toBeVisible();
  });

  test("Alt+N shortcut opens new tag modal", async ({ page }) => {
    await navigateToSettings(page, "Tags");
    await page.locator("body").click();
    await page.keyboard.press("Alt+n");
    await expect(page.getByText("New Tag")).toBeVisible();
  });
});

// ─── Transactions (Inline Editing) ──────────────────────

test.describe("Transactions", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("shows transactions page by default after onboarding", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: /Transactions/ })
    ).toBeVisible();
  });

  test("can create a transaction via inline editing", async ({ page }) => {
    // Click the new row placeholder
    await page.getByText("+ New transaction").click();

    // Fill in the description and value cells
    await page.getByPlaceholder("Description").fill("Grocery shopping");
    await page.getByLabel("Value").fill("5000");
    // Commit with Ctrl+Enter
    await page.keyboard.press("Control+Enter");

    await expect(
      page.getByRole("cell", { name: "Grocery shopping" })
    ).toBeVisible();
  });

  test("can edit a transaction inline", async ({ page }) => {
    // Create a transaction first
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("Lunch");
    await page.getByLabel("Value").fill("2000");
    await page.keyboard.press("Control+Enter");
    await expect(page.getByRole("cell", { name: "Lunch" })).toBeVisible();

    // Click the row to edit
    const lunchRow = page.getByRole("row").filter({ hasText: "Lunch" });
    await lunchRow.click();

    // Modify description
    await page.getByPlaceholder("Description").fill("Dinner");
    await page.keyboard.press("Control+Enter");

    await expect(page.getByRole("cell", { name: "Dinner" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Lunch" })).not.toBeVisible();
  });

  test("can delete a transaction", async ({ page }) => {
    // Create
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("To delete");
    await page.getByLabel("Value").fill("100");
    await page.keyboard.press("Control+Enter");

    const row = page.getByRole("row").filter({ hasText: "To delete" });
    await row.getByRole("button", { name: "✕" }).click();

    await expect(
      page.getByRole("cell", { name: "To delete" })
    ).not.toBeVisible();
  });

  test("displays formatted value with currency symbol", async ({ page }) => {
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("Formatted test");
    await page.getByLabel("Value").fill("1050");
    await page.keyboard.press("Control+Enter");

    // 1050 cents in BRL (2 decimals) = R$ 10.50
    await expect(page.getByRole("cell", { name: "R$ 10.50" })).toBeVisible();
  });

  test("Escape cancels inline editing", async ({ page }) => {
    await page.getByText("+ New transaction").click();
    // Verify editing row is visible
    await expect(
      page.getByRole("row").filter({ has: page.locator("input") })
    ).toBeVisible();

    await page.keyboard.press("Escape");

    // Should be back to placeholder
    await expect(page.getByText("+ New transaction")).toBeVisible();
  });
});

// ─── Sidebar Account Navigation ─────────────────────────

test.describe("Sidebar Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("sidebar shows accounts from onboarding", async ({ page }) => {
    // The sidebar should show our two accounts
    const sidebar = page.locator("nav");
    await expect(sidebar.getByText("Wallet")).toBeVisible();
    await expect(sidebar.getByText("Bank")).toBeVisible();
    await expect(sidebar.getByText("All Transactions")).toBeVisible();
  });

  test("clicking an account filters transactions", async ({ page }) => {
    // Create a transaction first
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("Test tx");
    await page.getByLabel("Value").fill("100");
    await page.keyboard.press("Control+Enter");
    await expect(page.getByRole("cell", { name: "Test tx" })).toBeVisible();

    // Click "Wallet" in sidebar — should show the transaction (Wallet is payer)
    await page.locator("nav").getByText("Wallet").click();
    await expect(
      page.getByRole("heading", { name: /Wallet.*Transactions/ })
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Test tx" })).toBeVisible();

    // Click "All Transactions" — should also show it
    await page.locator("nav").getByText("All Transactions").click();
    await expect(
      page.getByRole("heading", { name: /All Transactions/ })
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Test tx" })).toBeVisible();
  });
});

// ─── Keyboard Shortcuts ──────────────────────────────────

test.describe("Keyboard Shortcuts", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("dark mode toggle button works", async ({ page }) => {
    const initialScheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-mantine-color-scheme")
    );

    await page.getByTitle("Toggle color scheme").click();

    const newScheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-mantine-color-scheme")
    );

    expect(newScheme).not.toBe(initialScheme);
  });

  test("Ctrl+Enter submits settings modal forms", async ({ page }) => {
    await navigateToSettings(page, "Tags");
    await page.locator("body").click();
    await page.keyboard.press("Alt+n");
    await expect(page.getByText("New Tag")).toBeVisible();
    await page.getByLabel("Name").fill("shortcut-tag");
    await page.keyboard.press("Control+Enter");

    // Modal should close and tag should appear
    await expect(page.getByText("New Tag")).not.toBeVisible();
    await expect(
      page.getByRole("cell", { name: "shortcut-tag" })
    ).toBeVisible();
  });

  test("Alt+N starts new transaction row", async ({ page }) => {
    await page.locator("body").click();
    await page.keyboard.press("Alt+n");
    // An editing row should appear with input fields
    await expect(page.getByPlaceholder("Description")).toBeVisible();
  });
});

// ─── Auto-Create Entities ───────────────────────────────

test.describe("Auto-Create", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can create a category inline from transaction editor", async ({
    page,
  }) => {
    await page.getByText("+ New transaction").click();

    await page.getByPlaceholder("Description").fill("Cat test");
    await page.getByLabel("Value").fill("100");

    // Click the category cell and type a new category name
    await page.getByPlaceholder("Category").click();
    await page.getByPlaceholder("Category").fill("Groceries");
    // Select the "Create" option
    await page.getByText('+ Create "Groceries"').click();

    await page.keyboard.press("Control+Enter");

    await expect(page.getByRole("cell", { name: "Groceries" })).toBeVisible();
  });

  test("can create a tag inline from transaction editor", async ({
    page,
  }) => {
    await page.getByText("+ New transaction").click();

    await page.getByPlaceholder("Description").fill("Tag test");
    await page.getByLabel("Value").fill("200");

    // Click the tags cell and type a new tag name
    await page.getByPlaceholder("Tags").click();
    await page.getByPlaceholder("Tags").fill("newtag");
    await page.getByText('+ Create "newtag"').click();

    await page.keyboard.press("Control+Enter");

    await expect(page.getByRole("cell", { name: "newtag" })).toBeVisible();
  });
});

// ─── Line Items ─────────────────────────────────────────

test.describe("Line Items", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can add line items to a new transaction", async ({ page }) => {
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("Supermarket");
    await page.getByLabel("Value").fill("3500");

    // Open items modal
    await page.getByRole("button", { name: "Items" }).click();
    await expect(
      page.getByRole("heading", { name: "Line Items" })
    ).toBeVisible();

    // Add first item
    await page.getByRole("button", { name: "+ Add item" }).click();
    await page.getByLabel("Item description").fill("Milk");
    await page.getByLabel("Item quantity").fill("2");
    await page.getByLabel("Item unit value").fill("500");

    // Verify total is computed (2 * 500 = 1000)
    await expect(page.getByText("= 1000")).toBeVisible();
    await expect(page.getByText("Total: 1000")).toBeVisible();

    // Close modal
    await page.getByRole("button", { name: "Done" }).click();

    // Items button should show count
    await expect(
      page.getByRole("button", { name: "Items (1)" })
    ).toBeVisible();

    // Commit
    await page.keyboard.press("Control+Enter");
    await expect(
      page.getByRole("cell", { name: /Supermarket/ })
    ).toBeVisible();

    // Badge should appear
    await expect(page.getByText("1 items")).toBeVisible();
  });

  test("can add multiple line items", async ({ page }) => {
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("Groceries");
    await page.getByLabel("Value").fill("2500");

    await page.getByRole("button", { name: "Items" }).click();

    // Add first item
    await page.getByRole("button", { name: "+ Add item" }).click();
    const descs = page.getByLabel("Item description");
    const qtys = page.getByLabel("Item quantity");
    const units = page.getByLabel("Item unit value");
    await descs.first().fill("Bread");
    await qtys.first().fill("1");
    await units.first().fill("800");

    // Add second item
    await page.getByRole("button", { name: "+ Add item" }).click();
    await descs.nth(1).fill("Eggs");
    await qtys.nth(1).fill("2");
    await units.nth(1).fill("600");

    // Total: 800 + 1200 = 2000
    await expect(page.getByText("Total: 2000")).toBeVisible();

    await page.getByRole("button", { name: "Done" }).click();
    await expect(
      page.getByRole("button", { name: "Items (2)" })
    ).toBeVisible();

    await page.keyboard.press("Control+Enter");

    // Badge should show 2 items
    await expect(page.getByText("2 items")).toBeVisible();
  });

  test("can remove a line item", async ({ page }) => {
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("Test remove");
    await page.getByLabel("Value").fill("1000");

    await page.getByRole("button", { name: "Items" }).click();

    // Add two items
    await page.getByRole("button", { name: "+ Add item" }).click();
    const descs = page.getByLabel("Item description");
    const units = page.getByLabel("Item unit value");
    await descs.first().fill("Item A");
    await units.first().fill("500");

    await page.getByRole("button", { name: "+ Add item" }).click();
    await descs.nth(1).fill("Item B");
    await units.nth(1).fill("300");

    await expect(page.getByText("Total: 800")).toBeVisible();

    // Remove first item
    await page.getByRole("button", { name: "Remove item" }).first().click();

    await expect(page.getByText("Total: 300")).toBeVisible();

    await page.getByRole("button", { name: "Done" }).click();
    await expect(
      page.getByRole("button", { name: "Items (1)" })
    ).toBeVisible();
  });

  test("line items badge tooltip shows product details", async ({ page }) => {
    // Create transaction with items
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("Store purchase");
    await page.getByLabel("Value").fill("1500");

    await page.getByRole("button", { name: "Items" }).click();
    await page.getByRole("button", { name: "+ Add item" }).click();
    await page.getByLabel("Item description").fill("Coffee beans");
    await page.getByLabel("Item quantity").fill("3");
    await page.getByLabel("Item unit value").fill("500");
    await page.getByRole("button", { name: "Done" }).click();
    await page.keyboard.press("Control+Enter");

    // Hover over the items badge to see tooltip
    await page.getByText("1 items").hover();
    await expect(page.getByText("3x Coffee beans")).toBeVisible();
  });

  test("line items persist when editing a transaction", async ({ page }) => {
    // Create transaction with items
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("Persist test");
    await page.getByLabel("Value").fill("2000");

    await page.getByRole("button", { name: "Items" }).click();
    await page.getByRole("button", { name: "+ Add item" }).click();
    await page.getByLabel("Item description").fill("Saved item");
    await page.getByLabel("Item unit value").fill("2000");
    await page.getByRole("button", { name: "Done" }).click();
    await page.keyboard.press("Control+Enter");

    await expect(page.getByText("1 items")).toBeVisible();

    // Click row to edit
    const row = page.getByRole("row").filter({ hasText: "Persist test" });
    await row.click();

    // Open items modal — should still have the item
    await page.getByRole("button", { name: "Items (1)" }).click();
    await expect(page.getByLabel("Item description")).toHaveValue("Saved item");

    await page.getByRole("button", { name: "Done" }).click();
    await page.keyboard.press("Control+Enter");

    // Badge still visible
    await expect(page.getByText("1 items")).toBeVisible();
  });

  test("line items survive page reload", async ({ page }) => {
    // Create transaction with items
    await page.getByText("+ New transaction").click();
    await page.getByPlaceholder("Description").fill("Reload test");
    await page.getByLabel("Value").fill("4000");

    await page.getByRole("button", { name: "Items" }).click();
    await page.getByRole("button", { name: "+ Add item" }).click();
    await page.getByLabel("Item description").fill("Durable item");
    await page.getByLabel("Item unit value").fill("4000");
    await page.getByRole("button", { name: "Done" }).click();
    await page.keyboard.press("Control+Enter");

    await expect(page.getByText("1 items")).toBeVisible();

    // Reload
    await page.reload();
    await expect(page.getByText("Hi, Test User")).toBeVisible({
      timeout: 5000,
    });

    // Items badge should still be there
    await expect(page.getByText("1 items")).toBeVisible();

    // Hover to verify content
    await page.getByText("1 items").hover();
    await expect(page.getByText("1x Durable item")).toBeVisible();
  });
});

// ─── Data Persistence ────────────────────────────────────

test.describe("Data Persistence", () => {
  test("data survives page reload", async ({ page }) => {
    await completeOnboarding(page);

    // Create a tag
    await navigateToSettings(page, "Tags");
    await page.getByRole("button", { name: /Add Tag/ }).click();
    await page.getByLabel("Name").fill("persistent");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(
      page.getByRole("cell", { name: "persistent" })
    ).toBeVisible();

    // Reload
    await page.reload();

    // After splash, app should show with data intact
    await expect(page.getByText("Hi, Test User")).toBeVisible({
      timeout: 5000,
    });
    await navigateToSettings(page, "Tags");
    await expect(
      page.getByRole("cell", { name: "persistent" })
    ).toBeVisible();
  });
});
