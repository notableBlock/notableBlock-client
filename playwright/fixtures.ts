import { test as baseTest, Locator } from "@playwright/test";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export * from "@playwright/test";

dotenv.config();

export const test = baseTest.extend<
  { noteLinks: Locator; noteCount: number; uniqueText: string },
  { workerStorageState: string }
>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  workerStorageState: [
    async ({ browser }, use) => {
      const e2eWorkerIndex = test.info().parallelIndex;
      const authDirectory = path.resolve(test.info().project.outputDir, ".auth");
      const statePath = path.resolve(authDirectory, `${e2eWorkerIndex}.json`);

      if (!fs.existsSync(authDirectory)) fs.mkdirSync(authDirectory, { recursive: true });
      if (fs.existsSync(statePath)) return await use(statePath);

      const context = await browser.newContext();

      await context.request.post(`${process.env.VITE_SERVER_URL}/users/e2e`, {
        data: { e2eWorkerIndex },
        headers: { "e2e-key": process.env.E2E_KEY ?? "" },
      });

      await context.storageState({ path: statePath });
      await context.close();

      await use(statePath);
    },
    { scope: "worker" },
  ],
  noteLinks: async ({ page }, use) => {
    await page.goto("/notes");
    await page.locator("a[href^='/notes/']").waitFor();

    const links = page.locator("a[href^='/notes/']:not([href^='/notes/tree'])");
    await use(links);
  },
  noteCount: async ({ page, noteLinks }, use) => {
    await page.waitForTimeout(3000);

    const count = await noteLinks.count();
    await use(count);
  },
  uniqueText: async ({}, use) => {
    const uniqueText = `노트 테스트 - ${Date.now()}`;
    await use(uniqueText);
  },
});
