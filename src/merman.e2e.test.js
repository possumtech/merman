import { test, expect } from '@playwright/test';

test('Verify Merman SPA loads, hydrates, and handles interactions', async ({ page }) => {
  const PORT = process.env.PORT;
  if (!PORT) throw new Error('PORT environment variable is not defined.');

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  await page.goto(`http://localhost:${PORT}`);
  
  // 1. Verify Title (Hydrated from en.json)
  const title = page.locator('h1[data-text="title"]');
  await expect(title).toHaveText('Merman Markdown Editor', { timeout: 10000 });

  // 2. Verify Status (Initial state)
  const status = page.locator('[data-text="status"]');
  await expect(status).toHaveText('Connecting...');

  // 3. Verify Static Inclusion
  const toggleBtn = page.locator('[data-action="toggle-mode"]');
  await expect(toggleBtn).toBeVisible();

  // 4. Verify Interaction
  await toggleBtn.click();
  await expect(status).toHaveText('Mode: view');
  
  // Verify body attribute change
  const body = page.locator('body');
  await expect(body).toHaveAttribute('data-viewmode', 'view');

  // Strict Console Error Check
  if (consoleErrors.length > 0) {
    throw new Error(`Routine Check Failed: Console errors detected!\n${consoleErrors.join('\n')}`);
  }
});
