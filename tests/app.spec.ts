import { test, expect, type Page } from "@playwright/test";

// Clear localStorage before each test so each one starts fresh
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/");
});

// ─── Helpers ──────────────────────────────────────────────

async function waitForSplash(page: Page) {
  await expect(page.getByText("Personal finance & budgeting")).toBeVisible();
  await expect(page.getByText("Personal finance & budgeting")).toBeHidden({
    timeout: 5000,
  });
}

async function completeOnboarding(page: Page) {
  await waitForSplash(page);

  // Step 0: Name
  await expect(page.getByText("What should we call you?")).toBeVisible();
  await page.getByPlaceholder("Your name").fill("Test User");
  await page.getByRole("button", { name: "Next" }).click();

  // Step 1: Currencies — add BRL and USD
  await expect(
    page.getByText("Pick from common currencies or add your own.")
  ).toBeVisible();
  await page.getByRole("button", { name: /BRL/ }).click();
  await page.getByRole("button", { name: /USD/ }).click();
  await page.getByRole("button", { name: "Next" }).click();

  // Step 2: Accounts — need at least 2
  await expect(page.getByText(/Add your bank accounts/)).toBeVisible();

  // Add first account — select currency first
  await page.getByRole("textbox", { name: "Currency" }).click();
  await page.getByRole("option", { name: /BRL/ }).click();
  await page.getByPlaceholder("Checking Account").fill("Wallet");
  await page.getByRole("button", { name: "Add" }).click();

  // Should show warning about needing one more
  await expect(page.getByText("Add at least one more account")).toBeVisible();

  // Next should be disabled with only 1 account
  await expect(page.getByRole("button", { name: "Next" })).toBeDisabled();

  // Add second account — currency is still selected from first add
  await page.getByPlaceholder("Checking Account").fill("Bank");
  await page.getByRole("button", { name: "Add" }).click();

  // Next should now be enabled
  await expect(page.getByRole("button", { name: "Next" })).toBeEnabled();

  await page.getByRole("button", { name: "Next" }).click();

  // Completed step
  await expect(page.getByText("You're all set, Test User!")).toBeVisible();
  await page.getByRole("button", { name: "Open Finance" }).click();

  // Main app should show
  await expect(page.getByText("Hi, Test User")).toBeVisible();
}

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

    // Verify we're in the app
    await expect(
      page.getByRole("heading", { name: "Transactions" })
    ).toBeVisible();
  });
});

// ─── Currencies CRUD ─────────────────────────────────────

test.describe("Currencies", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can navigate to currencies page", async ({ page }) => {
    await page.locator("nav").getByText("Currencies").click();
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
    await page.locator("nav").getByText("Currencies").click();
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
    await page.locator("nav").getByText("Currencies").click();

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
    await page.locator("nav").getByText("Currencies").click();
    const usdRow = page.getByRole("row").filter({ hasText: "USD" });
    await usdRow.getByRole("button", { name: "✕" }).click();

    await expect(
      page.getByRole("cell", { name: "USD", exact: true })
    ).not.toBeVisible();
  });

  test("N shortcut opens new currency modal", async ({ page }) => {
    await page.locator("nav").getByText("Currencies").click();
    await page.keyboard.press("n");
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
    await page.locator("nav").getByText("Accounts").click();
    await expect(
      page.getByRole("heading", { name: "Accounts" })
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Wallet" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Bank" })).toBeVisible();
  });

  test("can create a new account", async ({ page }) => {
    await page.locator("nav").getByText("Accounts").click();
    await page.getByRole("button", { name: /Add Account/ }).click();

    await page.getByLabel("Name").fill("Credit Card");
    // Type defaults to "checking" and Currency defaults to first currency (BRL)
    await page.getByRole("button", { name: "Create" }).click();

    await expect(
      page.getByRole("cell", { name: "Credit Card" })
    ).toBeVisible();
  });

  test("can edit an account", async ({ page }) => {
    await page.locator("nav").getByText("Accounts").click();
    const walletRow = page.getByRole("row").filter({ hasText: "Wallet" });
    await walletRow.getByRole("button", { name: "✏" }).click();

    await page.getByLabel("Name").fill("Cash Wallet");
    await page.getByRole("button", { name: "Save" }).click();

    await expect(
      page.getByRole("cell", { name: "Cash Wallet" })
    ).toBeVisible();
  });

  test("can delete an account", async ({ page }) => {
    await page.locator("nav").getByText("Accounts").click();
    const bankRow = page.getByRole("row").filter({ hasText: "Bank" });
    await bankRow.getByRole("button", { name: "✕" }).click();

    await expect(page.getByRole("cell", { name: "Bank" })).not.toBeVisible();
  });

  test("N shortcut opens new account modal", async ({ page }) => {
    await page.locator("nav").getByText("Accounts").click();
    await page.keyboard.press("n");
    await expect(page.getByText("New Account")).toBeVisible();
  });
});

// ─── Categories CRUD ─────────────────────────────────────

test.describe("Categories", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("can create a top-level category", async ({ page }) => {
    await page.locator("nav").getByText("Categories").click();
    await page.getByRole("button", { name: /Add Category/ }).click();

    await page.getByLabel("Name").fill("Leisure");
    await page.getByRole("button", { name: "Create" }).click();

    await expect(page.getByRole("cell", { name: "Leisure" })).toBeVisible();
  });

  test("can create a subcategory", async ({ page }) => {
    await page.locator("nav").getByText("Categories").click();

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
    await page.locator("nav").getByText("Categories").click();
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
    await page.locator("nav").getByText("Categories").click();
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
    await page.locator("nav").getByText("Tags").click();
    await page.getByRole("button", { name: /Add Tag/ }).click();
    await page.getByLabel("Name").fill("vacation");
    await page.getByRole("button", { name: "Create" }).click();

    await expect(page.getByRole("cell", { name: "vacation" })).toBeVisible();
  });

  test("can edit a tag", async ({ page }) => {
    await page.locator("nav").getByText("Tags").click();
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
    await page.locator("nav").getByText("Tags").click();
    await page.getByRole("button", { name: /Add Tag/ }).click();
    await page.getByLabel("Name").fill("remove-me");
    await page.getByRole("button", { name: "Create" }).click();

    const row = page.getByRole("row").filter({ hasText: "remove-me" });
    await row.getByRole("button", { name: "✕" }).click();

    await expect(
      page.getByRole("cell", { name: "remove-me" })
    ).not.toBeVisible();
  });

  test("N shortcut opens new tag modal", async ({ page }) => {
    await page.locator("nav").getByText("Tags").click();
    await page.keyboard.press("n");
    await expect(page.getByText("New Tag")).toBeVisible();
  });
});

// ─── Transactions CRUD ───────────────────────────────────

test.describe("Transactions", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("shows transactions page by default after onboarding", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Transactions" })
    ).toBeVisible();
  });

  test("can create a transaction", async ({ page }) => {
    await page.getByRole("button", { name: /Add Transaction/ }).click();

    await page.getByLabel("Description").fill("Grocery shopping");
    await page.getByLabel("Value (smallest unit)").fill("5000");
    // Payer and Payee are pre-selected from openNew (first two accounts)
    await page.getByRole("button", { name: "Create" }).click();

    await expect(
      page.getByRole("cell", { name: "Grocery shopping" })
    ).toBeVisible();
  });

  test("can create a transaction with category and tags", async ({ page }) => {
    // First create a category
    await page.locator("nav").getByText("Categories").click();
    await page.getByRole("button", { name: /Add Category/ }).click();
    await page.getByLabel("Name").fill("Food");
    await page.getByRole("button", { name: "Create" }).click();

    // Create a tag
    await page.locator("nav").getByText("Tags").click();
    await page.getByRole("button", { name: /Add Tag/ }).click();
    await page.getByLabel("Name").fill("essential");
    await page.getByRole("button", { name: "Create" }).click();

    // Now create a transaction
    await page.locator("nav").getByText("Transactions").click();
    await page.getByRole("button", { name: /Add Transaction/ }).click();

    await page.getByLabel("Description").fill("Supermarket");
    await page.getByLabel("Value (smallest unit)").fill("3500");
    // Payer and Payee are pre-selected
    await page.getByRole("textbox", { name: "Category" }).click();
    await page.getByRole("option", { name: "Food" }).click();
    // MultiSelect: click the wrapper div which holds the input
    await page.locator(".mantine-MultiSelect-input").click();
    await page.getByRole("option", { name: "essential" }).click();
    // Click outside to close the dropdown
    await page.getByLabel("Description").click();
    await page.getByRole("button", { name: "Create" }).click();

    await expect(
      page.getByRole("cell", { name: "Supermarket" })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Food", exact: true })
    ).toBeVisible();
  });

  test("can edit a transaction", async ({ page }) => {
    // Create
    await page.getByRole("button", { name: /Add Transaction/ }).click();
    await page.getByLabel("Description").fill("Lunch");
    await page.getByLabel("Value (smallest unit)").fill("2000");
    await page.getByRole("button", { name: "Create" }).click();

    // Edit
    const lunchRow = page.getByRole("row").filter({ hasText: "Lunch" });
    await lunchRow.getByRole("button", { name: "✏" }).click();
    await page.getByLabel("Description").fill("Dinner");
    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByRole("cell", { name: "Dinner" })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Lunch" })
    ).not.toBeVisible();
  });

  test("can delete a transaction", async ({ page }) => {
    // Create
    await page.getByRole("button", { name: /Add Transaction/ }).click();
    await page.getByLabel("Description").fill("To delete");
    await page.getByLabel("Value (smallest unit)").fill("100");
    await page.getByRole("button", { name: "Create" }).click();

    const row = page.getByRole("row").filter({ hasText: "To delete" });
    await row.getByRole("button", { name: "✕" }).click();

    await expect(
      page.getByRole("cell", { name: "To delete" })
    ).not.toBeVisible();
  });

  test("displays formatted value with currency symbol", async ({ page }) => {
    await page.getByRole("button", { name: /Add Transaction/ }).click();
    await page.getByLabel("Description").fill("Formatted test");
    await page.getByLabel("Value (smallest unit)").fill("1050");
    await page.getByRole("button", { name: "Create" }).click();

    // 1050 cents in BRL (2 decimals) = R$ 10.50
    await expect(page.getByRole("cell", { name: "R$ 10.50" })).toBeVisible();
  });
});

// ─── Keyboard Shortcuts ──────────────────────────────────

test.describe("Keyboard Shortcuts", () => {
  test.beforeEach(async ({ page }) => {
    await completeOnboarding(page);
  });

  test("Alt+1-5 navigates between pages", async ({ page }) => {
    await page.keyboard.press("Alt+2");
    await expect(
      page.getByRole("heading", { name: "Accounts" })
    ).toBeVisible();

    await page.keyboard.press("Alt+3");
    await expect(
      page.getByRole("heading", { name: "Categories" })
    ).toBeVisible();

    await page.keyboard.press("Alt+4");
    await expect(page.getByRole("heading", { name: "Tags" })).toBeVisible();

    await page.keyboard.press("Alt+5");
    await expect(
      page.getByRole("heading", { name: "Currencies" })
    ).toBeVisible();

    await page.keyboard.press("Alt+1");
    await expect(
      page.getByRole("heading", { name: "Transactions" })
    ).toBeVisible();
  });

  test("Alt+D toggles dark mode", async ({ page }) => {
    // Get initial color scheme
    const initialScheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-mantine-color-scheme")
    );

    await page.keyboard.press("Alt+d");

    const newScheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-mantine-color-scheme")
    );

    expect(newScheme).not.toBe(initialScheme);
  });

  test("Escape closes modals", async ({ page }) => {
    await page.keyboard.press("n");
    await expect(page.getByText("New Transaction")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByText("New Transaction")).not.toBeVisible();
  });
});

// ─── Data Persistence ────────────────────────────────────

test.describe("Data Persistence", () => {
  test("data survives page reload", async ({ page }) => {
    await completeOnboarding(page);

    // Create a tag
    await page.locator("nav").getByText("Tags").click();
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
    await page.locator("nav").getByText("Tags").click();
    await expect(
      page.getByRole("cell", { name: "persistent" })
    ).toBeVisible();
  });
});
