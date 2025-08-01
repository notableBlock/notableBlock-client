import { test as baseTest, expect, Locator } from "@playwright/test";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import acquireAccount from "./utils/acquireAccount";

export * from "@playwright/test";

dotenv.config();

export const test = baseTest.extend<
  { noteLinks: Locator; noteCount: number },
  { workerStorageState: string }
>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  workerStorageState: [
    async ({ browser }, use) => {
      const id = test.info().parallelIndex;
      const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

      if (fs.existsSync(fileName)) {
        await use(fileName);
        return;
      }

      const page = await browser.newPage({ storageState: undefined });
      const account = acquireAccount(id);

      await page.goto(`${process.env.CLIENT_URL}/login`);

      const popupPromise = page.waitForEvent("popup");
      await page.getByRole("button", { name: "구글 로그인 하기" }).click({ delay: 500 });
      const popup = await popupPromise;

      await popup.fill("input[type='email']", account.email);
      await popup.getByRole("button", { name: "다음" }).click();
      await popup.fill("input[type='password']", account.password);
      await popup.getByRole("button", { name: "다음" }).click();
      await popup.getByRole("button", { name: "계속" }).click();

      await page.waitForURL(`${process.env.CLIENT_URL}/notes`);
      await expect(page).toHaveURL(`${process.env.CLIENT_URL}/notes`);

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
  noteLinks: async ({ page }, use) => {
    await page.goto("/notes");
    await page.locator("a[href^='/notes/']").waitFor();
    const links = page.locator("a[href^='/notes/']:not([href^='/notes/tree'])");
    await use(links);
  },
  noteCount: async ({ noteLinks }, use) => {
    const count = await noteLinks.count();
    await use(count);
  },
});
