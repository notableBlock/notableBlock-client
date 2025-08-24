import { test, expect } from "../../playwright/fixtures";

test.describe("노트 읽기 및 수정 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/notes");

    await expect(page).toHaveURL("/notes");
    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);

    await page.locator('img[src*="plus-option-icon"]').click();
    await page.getByRole("button", { name: "새 노트 만들기" }).click();
    await expect(page).toHaveURL(/\/notes\/.*/);
  });

  test("노트를 수정하면 자동 저장되고, 노트 페이지에서 다시 접근해 읽을 수 있습니다.", async ({
    page,
  }) => {
    await expect(page).toHaveURL(/\/notes\/.*/);

    const uniqueText = `노트 수정 테스트 - ${Date.now()}`;

    await page.getByRole("heading").fill(uniqueText);
    await expect(page.getByText("자동저장 성공 ✅")).toBeVisible();

    await page.getByRole("link", { name: "내 노트", exact: true }).click();
    await expect(page).toHaveURL("/notes");
    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);

    await page.getByRole("link", { name: uniqueText }).click();
    await expect(page).toHaveURL(/\/notes\/.*/);
    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: uniqueText })).toBeVisible();
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
