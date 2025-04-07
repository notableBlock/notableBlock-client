import { test, expect } from "../../playwright/fixtures";

test.describe("노트 삭제 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/notes");

    await expect(page).toHaveURL("/notes");
    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);

    await page.locator('img[src*="plus-option-icon"]').click();
    await page.getByRole("button", { name: "새 노트 만들기" }).click();
    await expect(page).toHaveURL(/\/notes\/.*/);

    await page.getByRole("link", { name: "내 노트", exact: true }).click();
  });

  test("사용자가 '⋮' 버튼으로 노트를 삭제하면, 노트 페이지에서 정상적으로 삭제됩니다.", async ({
    page,
    noteLinks,
    noteCount,
  }) => {
    await page.locator("img[src*='kebab-menu-icon']").nth(0).click();
    await page.getByRole("button", { name: "삭제하기" }).click();

    await expect(page.getByText("잠시만 기다려주세요.")).toHaveCount(0);
    await expect(noteLinks).toHaveCount(noteCount);
  });
});
