/* eslint-disable testing-library/prefer-screen-queries */
import {expect, test} from '@playwright/test';

test('paint something using fill and lines', async ({page}) => {
  await page.goto('http://localhost:4200/');

  await page.getByLabel('axisLabel-5,5').getByRole('button').click();

  const slot00 = page.getByLabel('slot-0,0');
  const slot04 = page.getByLabel('slot-0,4');
  const slot40 = page.getByLabel('slot-4,0');

  await expect(slot00.getByLabel('sprite-Grass')).toBeVisible();
  await expect(slot04.getByLabel('sprite-Grass')).toBeVisible();
  await expect(slot40.getByLabel('sprite-Grass')).toBeVisible();
  // await expect(slot04.locator(page.getByLabel('sprite-grass'))).toBeVisible();
  // await expect(slot40.locator(page.getByLabel('sprite-grass'))).toBeVisible();

  await page.getByRole('button', {name: 'sprite-Sand', exact: true}).click();
  await page.getByLabel('axisLabel-0,5').getByRole('button').click();

  await expect(slot00.getByLabel('sprite-Sand')).toBeVisible();
  await expect(slot04.getByLabel('sprite-Sand')).toBeVisible();
  await expect(slot40.getByLabel('sprite-Grass')).toBeVisible();

  await page.getByRole('button', {name: 'sprite-Snow', exact: true}).click();
  await page.getByLabel('axisLabel-5,0').getByRole('button').click();

  await expect(slot00.getByLabel('sprite-Snow')).toBeVisible();
  await expect(slot04.getByLabel('sprite-Sand')).toBeVisible();
  await expect(slot40.getByLabel('sprite-Snow')).toBeVisible();
});
/* eslint-enable testing-library/prefer-screen-queries */
