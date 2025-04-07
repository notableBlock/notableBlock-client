import { test, expect } from "../../playwright/fixtures";

test.describe("노트 생성 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/notes");

    await expect(page).toHaveURL("/notes");
    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);
  });

  test("사용자가 '+' 버튼으로 새 노트를 만들면, 에디터 페이지로 이동하고 동시에 노트 페이지에 정상적으로 추가됩니다.", async ({
    page,
    noteLinks,
    noteCount,
  }) => {
    await page.locator('img[src*="plus-option-icon"]').click();
    await page.getByRole("button", { name: "새 노트 만들기" }).click();
    await expect(page).toHaveURL(/\/notes\/.*/);

    await page.getByRole("link", { name: "내 노트", exact: true }).click();
    await expect(noteLinks).toHaveCount(noteCount + 1);
  });

  test.afterEach(async ({ page, noteCount }) => {
    await page
      .locator("img[src*='kebab-menu-icon']")
      .nth(noteCount - 1)
      .click();
    await page.getByRole("button", { name: "삭제하기" }).click();

    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);
    await expect(page.getByText("삭제되었어요")).toBeVisible();
  });
});
