import { test as baseTest, expect, Locator } from "@playwright/test";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import acquireAccount from "./utils/acquireAccount";

export * from "@playwright/test";

dotenv.config();

export const test = baseTest.extend<
  { noteLinks: Locator; noteCount: number; uniqueText: string },
  { workerStorageState: string }
>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  workerStorageState: [
    async ({ browser }, use) => {
      const id = test.info().parallelIndex;
      const authDir = path.resolve(test.info().project.outputDir, ".auth");
      const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

      if (fs.existsSync(fileName)) {
        await use(fileName);
        return;
      }

      fs.mkdirSync(authDir, { recursive: true });

      const page = await browser.newPage({ storageState: undefined });
      const account = acquireAccount(id);

      await page.goto(`${process.env.CLIENT_URL}/login`);

      const popupPromise = page.waitForEvent("popup");
      await page.getByRole("button", { name: "구글 로그인 하기" }).click({ delay: 1000 });
      const popup = await popupPromise;

      await popup
        .getByRole("textbox", { name: /Email or phone|이메일 또는 휴대전화/i })
        .fill(account.email);
      await popup.getByRole("button", { name: /^(Next|다음)$/i }).click();

      await popup
        .getByRole("textbox", { name: /Enter your password|비밀번호 입력/i })
        .fill(account.password);
      await popup.getByRole("button", { name: /^(Next|다음)$/i }).click();
      await popup.getByRole("button", { name: /^(Continue|계속)$/i }).click();

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
