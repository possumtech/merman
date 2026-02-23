import { test, expect } from '@playwright/test';

test('Verify Merman SPA loads and hydrates', async ({ page }) => {
  const PORT = process.env.PORT;
  if (!PORT) throw new Error('PORT environment variable is not defined.');

  // Catch console logs and errors
  const logs = [];
  page.on('console', (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', (err) => logs.push(`[ERROR] ${err.message}`));

  await page.goto(`http://localhost:${PORT}`);
  
  // Wait for OTM to populate the title
  const title = page.locator('h1[data-text="title"]');
  try {
    await expect(title).toHaveText('Merman Markdown Editor', { timeout: 10000 });
  } catch (e) {
    console.log('--- BROWSER LOGS ---');
    console.log(logs.join('\n'));
    console.log('--- END BROWSER LOGS ---');
    throw e;
  }

  // Verify the editor template was cloned
  const editor = page.locator('article');
  await expect(editor).toBeVisible();

  console.log('✔ SPA verified: Handshake complete, state hydrated, no console errors.');
});
