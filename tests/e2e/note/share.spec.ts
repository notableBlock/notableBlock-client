import { test, expect } from "../../../playwright/fixtures";
import path from "path";

test.describe("노트 공유 기능", () => {
  test.beforeEach(async ({ page, uniqueText }) => {
    await page.goto("/notes");

    await expect(page).toHaveURL("/notes");
    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);

    await page.locator('img[src*="plus-option-icon"]').click();

    await expect(page).toHaveURL(/\/notes\/.*/);

    await page.getByRole("heading").fill(uniqueText);
    await page.waitForTimeout(1000);
    await expect(page.getByText("자동저장 성공 ✅")).toBeVisible();

    await page.getByRole("link", { name: "내 노트", exact: true }).click();
  });

  test("사용자가 '⋮' 버튼으로 노트를 공유하면, 실시간 공유 노트 페이지에 정상적으로 추가됩니다.", async ({
    page,
    noteCount,
    uniqueText,
  }) => {
    await page.goto("/shared");
    await expect(page).toHaveURL("/shared");
    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);

    await page.goto("/notes");
    await expect(page).toHaveURL("/notes");
    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);

    await page
      .locator("img[src*='kebab-menu-icon']")
      .nth(noteCount - 1)
      .click();
    await page.getByRole("button", { name: "공유하기" }).click();
    await expect(page.getByText("공유했어요")).toBeVisible();

    await page.goto("/shared");
    await expect(page).toHaveURL("/shared");
    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: uniqueText })).toBeVisible();
  });

  test("다른 사용자가 공유한 노트를 실시간 공유 노트 페이지에서 확인할 수 있습니다.", async ({
    page,
    browser,
    noteCount,
    uniqueText,
  }) => {
    await page.goto("/shared");
    await expect(page).toHaveURL("/shared");
    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);

    await page.goto("/notes");
    await expect(page).toHaveURL("/notes");
    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);

    await page
      .locator("img[src*='kebab-menu-icon']")
      .nth(noteCount - 1)
      .click();
    await page.getByRole("button", { name: "공유하기" }).click();
    await expect(page.getByText("공유했어요")).toBeVisible();

    const workerId = test.info().parallelIndex;
    const storageFilePath = path.resolve(
      test.info().project.outputDir,
      `.auth/${workerId === 0 ? 1 : workerId}.json`
    );

    const user2Context = await browser.newContext({
      storageState: storageFilePath,
    });
    const user2Page = await user2Context.newPage();

    await user2Page.goto("/shared");
    await expect(user2Page.getByText("잠시만 기다려주세요.")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: uniqueText })).toBeVisible();

    await user2Context.close();
  });

  test.afterEach(async ({ page, noteCount }) => {
    await page.goto("/notes");

    await page
      .locator("img[src*='kebab-menu-icon']")
      .nth(noteCount - 1)
      .click();
    await page.getByRole("button", { name: "삭제하기" }).click();

    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);
    await expect(page.getByText("삭제되었어요.")).toBeVisible();

    await page.locator("img[src*='notification-icon']").click();
    await page.waitForTimeout(1000);

    await page.getByRole("button", { name: "모두 삭제" }).click();
    await expect(page.getByText("모든 알림을 확인했어요.")).toBeVisible();
  });
});
