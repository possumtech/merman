import { test, expect } from '@playwright/test';

test('Verify Merman SPA loads, hydrates, and handles interactions', async ({ page }) => {
  const PORT = process.env.PORT;
  if (!PORT) throw new Error('PORT environment variable is not defined.');

  const logs = [];
  page.on('console', (msg) => {
    const text = msg.text();
    logs.push(`[${msg.type()}] ${text}`);
    console.log(`BROWSER: [${msg.type()}] ${text}`);
  });
  page.on('pageerror', (err) => {
    logs.push(`[ERROR] ${err.message}`);
    console.error(`BROWSER ERROR: ${err.message}`);
  });

  await page.goto(`http://localhost:${PORT}`);
  
  const title = page.locator('h1[data-text="title"]');
  await expect(title).toHaveText('Merman Markdown Editor', { timeout: 10000 });

  const status = page.locator('[data-text="status"]');
  await expect(status).toHaveText('Online');

  const toggleBtn = page.locator('[data-action="toggle-mode"]');
  await expect(toggleBtn).toBeVisible();
  
  console.log('Clicking toggle button...');
  await toggleBtn.click();
  
  await expect(status).toHaveText('Mode: view', { timeout: 10000 });
  
  const body = page.locator('body');
  await expect(body).toHaveAttribute('data-viewmode', 'view');

  if (logs.some(l => l.startsWith('[ERROR]'))) {
    throw new Error('Browser errors detected during test');
  }
});
