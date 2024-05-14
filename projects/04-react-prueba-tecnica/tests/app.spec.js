// @ts-check
import { test, expect } from '@playwright/test';

const LOCALHOST_URL = 'http://localhost:5173';
const CATAAS_BASE_URL = 'https://cataas.com';

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  // Getting rendered fact
  const text = await page.getByRole('paragraph');
  const textContent = await text.textContent();


  // Getting rendered image
  const img = await page.getByRole('img');
  const imgSrc = await img.getAttribute('src');


  await expect(text).toBeDefined();
  await expect(text).toBeVisible();
  await expect(textContent?.length).toBeGreaterThan(0);


  await expect(img).toBeDefined();
  await expect(img).toBeVisible();
  await expect(imgSrc).toContain(CATAAS_BASE_URL);
  await expect(imgSrc?.startsWith(CATAAS_BASE_URL)).toBeTruthy();
});

test('change fact after click', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  // Getting rendered fact
  const text = await page.getByRole('paragraph');
  const textContent = await text.textContent();

  // Getting button "Get new fact"
  const button = await page.getByRole('button');
  const buttonContent = await button.textContent();

  await expect(button).toBeDefined();
  await expect(button).toBeVisible();
  await expect(buttonContent).toEqual('Get new fact');

  await button.click();
  await page.waitForTimeout(1000)

  const newText = await page.getByRole('paragraph');
  const newTextContent = await newText.textContent();

  await expect(newTextContent).not.toEqual(textContent);
});
